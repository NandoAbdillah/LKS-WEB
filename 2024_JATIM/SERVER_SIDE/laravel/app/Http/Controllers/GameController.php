<?php
// GameController
namespace App\Http\Controllers;

use App\Http\Resources\ApiResponse;
use App\Models\Game;
use App\Models\User;
use App\Models\Score;
use App\Models\GameVersion;
use Illuminate\Foundation\Exceptions\Handler;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class GameController extends Controller
{
    public function index(Request $request)
    {
        // Ambil query parameter

        $page = $request->query('page', 0);
        $size = $request->query('size', 10);
        $sortBy = $request->query('sortBy', 'title');
        $sortDir = $request->query('sortDir', 'asc');


        // Validasi input
        $request->validate([
            'page' => 'integer|min:0',
            'size' => 'integer|min:1',
            'sortBy' => 'in:title,popular,uploaddate',
            'sortDir' => 'in:asc,desc',
        ]);

        // Query dasar untuk mendapatkan games
        $query = Game::with(['latestVersion', 'author'])->withSum('scores', 'score')
            ->with('latestVersion') // Ambil versi terbaru untuk setiap game
            ->when($sortBy === 'popular', function ($q) use ($sortDir) {
                // scores_sum_score adalah tabel tambahan karena kita menjalankan query dengan withSum , namun kolom ini hanya akan ada di query dan bukan di database kita sendiri
                $q->orderBy('scores_sum_score', $sortDir);
            })->when($sortBy === 'uploaddate', function ($q) use ($sortDir) {
                $q->leftJoin('game_versions as latestVersion', 'games.id', '=', 'latestVersion.game_id')
                    ->orderBy('latestVersion.created_at', $sortDir);
            })->when($sortBy === 'title', function ($q) use ($sortDir) {
                $q->orderBy('title', $sortDir);
            }); // Sorting berdasarkan popularitas, tanggal upload, atau judul

        // Jika user mengininkan berapa banyak kolom score yang relate maka menggunakan withCount jika menjumlahnkan di kolom spesifik menggunakan withSum


        // $query = Game::with(['latestVersion', 'author'])





        // Paginasi
        $totalElements = $query->count();
        $games = $query->skip($page * $size)->take($size)->get();

        // Mapping Hasil 
        $content = $games->map(function ($game) {
            return [
                'slug' => $game->slug,
                'title' => $game->title,
                'description' => $game->description,
                'thumbnail' => $game->latestVersion->thumbnail ?? null,
                'uploadTimestamp' => optional($game->latestVersion)->created_at,
                'author' => $game->author->username,
                'scoreCount' => $game->scores_sum_score,
            ];
        });

        return response()->json([
            'page' => $page,
            'size' => $size,
            'totalElements' => $totalElements,
            'content' => $content,
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|min:3|max:60',
            'description' => 'required|min:0|max:200',
        ]);

        $slug = Str::slug($validated['title']);

        if (Game::where('slug', $slug)->exists()) {
            // return response()->json([
            //     'status' => 'invalid',
            //     'message' => 'Game title already exists'
            // ], 400);

            return  ApiResponse::success('invalid', 'Game title already exists', 400);
        }

        $game = Game::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'description' => $validated['description'],
            'created_by' => Auth::id()
        ]);

        return response()->json([
            'status' => 'success',
            'slug' => $game->slug,
        ], 201);
    }

    public function show($slug)
    {
        $game = Game::where('slug', $slug)->first();

        if (!$game) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Game not found'
            ], 404);
        }

        $game::with(['latestVersion', 'author'])->withSum('scores', 'score');

        return response()->json([
            'slug' => $game->slug,
            'title' => $game->title,
            'description' => $game->description,
            'thumbnail' => $game->thumbnail ?? null,
            'uploadTimestamp' => $game->created_at,
            // Memenggil relasi author dan mengambil data usernamenya
            'author' => $game->author->username,
            'scoreCount' => $game->scores_sum_score,
            'gamePath' => $game->latestVersion->game_path ?? null,
        ], 200);
    }


    public function update(Request $request, $slug)
    {

        $game = Game::where('slug', $slug)->first();

        if ($game->author->id !== Auth::id()) {
            return response()->json([
                'status' => 'forbidden',
                'message' => "You are not the gameauthor sebenarnya",
            ], 403);
        }

        $validated = $request->validate([
            'title' => 'required|min:3|max:25',
            'description' => 'required|min:0|max:200'
        ]);

        if (Game::where('title', $validated['title'])->where('id', '!=', $game->id)->exists()) {
            return response()->json([
                "status" => 'invalid',
                'message' => 'Game title is already exists',
            ], 401);
        }


        $game->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);

        return response()->json([
            'status' => 'success',
        ], 200);
    }


    public function destroy($slug)
    {
        $game = Game::where('slug', $slug)->first();

        if (!$game) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Game not found'
            ], 404);
        }

        if ($game->author->id != Auth::id()) {
            return response()->json([
                'status' => 'forbidden',
                'message' => 'You are not the game author'
            ], 403);
        }

        $game->delete();

        return response()->noContent();
    }




    public function upload(Request $request, $slug)
    {

        $request->validate([
            'zipfile' => 'required|file|mimes:zip',
            'token' => 'required|string',
        ]);


        $game = Game::where('slug', $slug)->first();

        if (!$game) {
            return response('Game not found', 404);
        }

        if ($game->created_by !== Auth::id()) {
            return response('User is not author of the game', 403);
        }

        $latestVersion = $game->latestVersion;
        $newVersion = $latestVersion ? preg_replace_callback('/\d+/', fn($m) => $m[0] + 1, $latestVersion) : 'v1';


        $filePath = $request->file('zipfile')->storeAs(
            "games/{$game->slug}/versions",
            "version_$newVersion.zip",
            'public',
        );

        // Menyimpan data ke database
        GameVersion::create([
            'game_id' => $game->id,
            'version' => $newVersion,
            'storage_path' => $filePath,
        ]);

        return response("Game version $newVersion uploaded successfully", 200);
    }


    public function serveGameFile($slug, $version)
    {
        $game = Game::where('slug', $slug)->first();

        if (!$game) {
            return response('Game not found', 404);
        }

        $gameVersion = GameVersion::where('game_id', $game->id)
            ->where('version', $version)
            ->first();;

        if (!$gameVersion) {
            return response('Game version not found', 404);
        }

        $filePath = $gameVersion->storage_path;

        if (!Storage::disk('public')->exists($filePath)) {
            return response('File not found', 404);
        }

        // Jika langsung didownload
        // return Storage::disk('public')->download($filePath);

        return response('Successfull attach game', 200);
    }

    public function highestScoresPerUser($slug)
    {
        // Ambil game berdasarkan slug
        $game = Game::where('slug', $slug)->firstOrFail();

        // Ambil skor tertinggi untuk setiap pemain
        $highestScores = Score::selectRaw('users.username, MAX(scores.score) as score, MAX(scores.updated_at) as timestamp')
            ->join('users', 'scores.user_id', '=', 'users.id')
            ->join('game_versions', 'scores.game_version_id', '=', 'game_versions.id')
            ->where('game_versions.game_id', $game->id)
            ->groupBy('users.id', 'users.username') // Kelompokkan berdasarkan pemain
            ->orderByDesc('score') // Urutkan berdasarkan skor tertinggi
            ->get();

        // Format response JSON
        $response = [
            'scores' => $highestScores->map(function ($score) {
                return [
                    'username' => $score->username,
                    'score' => $score->score,
                    'timestamp' => (new \DateTime($score->timestamp))->format(\DateTime::ATOM),
                ];
            }),
        ];

        return response()->json($response, 200);
    }


    public function postScore(Request $request, $slug)
    {
        // Validasi input request
        $validatedData = $request->validate([
            'score' => 'required|numeric|min:0',
        ]);

        // Cari game berdasarkan slug
        $game = Game::where('slug', $slug)->firstOrFail();

        // Cari versi game terbaru berdasarkan game_id
        $latestGameVersion = GameVersion::where('game_id', $game->id)
            ->latest('created_at')
            ->firstOrFail();

            
        // Simpan skor ke dalam database
        Score::create([
            'user_id' => auth()->id(), // Ambil ID user yang sedang login
            'game_version_id' => $latestGameVersion->id,
            'score' => $validatedData['score'],
        ]);


        // Kembalikan respons sukses
        return response()->json(['status' => 'success'], 201);
    }
}
