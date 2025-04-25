<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameVersion;
use App\Models\Score;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

use function PHPUnit\Framework\returnSelf;

class GameController extends Controller
{

    public function index(Request $request)
    {
        $page = $request->query('page', 0);
        $size = $request->query('size', 10);
        $sortBy = $request->query('sortBy', 'title');
        $sortDir = $request->query('sortDir', 'asc');

        $request->validate([
            'page' => 'integer|min:0',
            'size' => 'integer|min:1',
            'sortBy' => 'in:title,uploaddate,popular',
            'sortDir' => 'in:asc,desc'
        ]);

        $query = Game::with(['latestVersion', 'author'])
            ->withSum('scores', 'score')
            ->when($sortBy === 'popular', function ($q) use ($sortDir) {
                $q->orderBy('scores_sum_score', $sortDir);
            })
            ->when($sortBy === 'title', function ($q) use ($sortDir) {
                $q->orderBy('title', $sortDir);
            })
            ->when($sortBy === 'uploaddate', function ($q) use ($sortDir) {
                $q->leftJoin('game_versions as latestVersion', 'latesVersion.game_id', '=', 'games.id')
                    ->orderBy('latestVersion.created_at', $sortDir);
            });

        $totalElements = $query->count();
        $games = $query->skip($page * $size)->take($size)->get();

        $content = $games->map(function ($game) {
            return [
                'slug' => $game->slug,
                'title' => $game->title,
                'description' => $game->description,
                'thumbnail' => $game->latestVersion->thumbnail,
                'uploadTimestamp' => $game->latestVersion->created_at,
                'author' => $game->author->username,
                'scoreCount' => $game->scores_sum_score
            ];
        });

        return response()->json([
            'page' => $page,
            'size' => $size,
            'totalElements' => $totalElements,
            'content' => $content
        ], 200);
    }


    public function allVersions($slug)
    {
        $game = Game::where('slug', $slug)->first();

        return response()->json([
            'status' => 'success',
            'version' => $game->versions
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|min:3|max:60',
            'description' => 'required|min:0|max:200',
            'thumbnail' => 'sometimes|image|mimes:png,jpg,jpeg|max:2048'
        ]);

        $slug = Str::slug($validated['title']);

        if (Game::where('slug', $slug)->exists()) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Game title already exists'
            ], 400);
        }


        $game = Game::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'description' => $validated['description'],
            'created_by' => Auth::id()
        ]);

        $gameVersion = GameVersion::create([
            'game_id' => $game->id,
            'version' => 'v1',
            'storage_path' => 'games/' . $game->id . '/v1/'
        ]);

        if ($request->file('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $thumbnail->storeAs("/games/$slug/v1", $thumbnail->hashName());

            $gameVersion->update([
                'thumbnail' => "/games/$slug/v1" . $thumbnail->hashName()
            ]);
        }


        return response()->json([
            'status' => 'success',
            'slug' => $game->slug
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
            'thumbnail' => $game->latestVersion->thumbnail ?? null,
            'uploadTimestamp' => $game->latestVersion->created_at ?? null,
            'author' => $game->author->username,
            'scoreCount' => $game->scores_sum_score,
            'gamePaath' => $game->latestVersion->game_path ?? null
        ], 200);
    }

    public function update(Request $request, $slug)
    {
        $game = Game::where('slug', $slug)->first();

        if ($game->author->id !== Auth::id()) {
            return response()->json([
                'status' => 'forbidden',
                'message' => 'You are note the game author'
            ], 403);
        }

        $request->validate([
            'title' => 'sometimes|min:3',
            'description' => 'sometimes|min:0|max:200',
            'thumbnail' => 'sometimes|image|mimes:jpg,png,jpeg|max:2048'
        ]);

        if (Game::where('title', $request->title)->where('id', '!=', $game->id)->exists()) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Game title is already exists'
            ], 401);
        }


        $latestVersion = $game->latestVersion->version;
        $newVersion =  $latestVersion == 'v1' ? 'v1' : 'v1' . ((int) substr($latestVersion, 1) + 1);


        $gameVersion = GameVersion::create([
            'game_id' => $game->id,
            'version' => $newVersion,
            'storage_path' => 'games/' . $game->id . '/' . $newVersion . '/'
        ]);

        if ($request->file('thumbnail')) {

            $thumbnail = $request->file('thumbnail');
            $thumbnail->storeAs('public/thumbnails' . $thumbnail->hashName());

            $gameVersion->update([
                'thumbnail' => $thumbnail->hashName()
            ]);
        }

        return response()->json([
            'status' => 'success'
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
            ]);
        }

        $game->delete();

        return response()->noContent();
    }


    public function upload(Request $request, $slug)
    {
        $request->validate([
            'zipfile' => 'required|file|mimes:zip'
        ]);

        $game = Game::where('slug', $slug)->first();

        if (!$game) {
            return response()->json([
                'message' => 'Game not found'
            ], 401);
        }

        if ($game->created_by !== Auth::id()) {
            return response()->json([
                'message' => 'User is not author of the game'
            ], 403);
        }

        $latestVersion = $game->latestVersion->version;
        $newVersion = $latestVersion  == 'v1' ? 'v1' :  'v' . ((int) substr($latestVersion, 1) + 1);


        // $zipFile = $request->file('zipfile')

        GameVersion::create([
            'game_id' => $game->id,
            'version' => $newVersion,
            'storage_path' => 'games/' . $game->id . '/' . $newVersion . '/'
        ]);


        return response()->json([
            'status' => 'success'
        ], 200);
    }

    public function serveGame($slug, $version)
    {
        $game = Game::where('slug', $slug)->first();

        if (!$game) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Game not found'
            ], 401);
        }

        $gameVersion = GameVersion::where('game_id', $game->id)
            ->where('version', $version)
            ->first();

        if (!$gameVersion) {
            return response()->json([
                'status' => 'not-found',
                'message' => 'Game version not found'
            ], 404);
        }

        $filePath = $gameVersion->storage_path;

        return response()->json([
            'status' => 'success',
            'gameUrl' => $filePath
        ], 200);
    }


    public function highestScorePerUser($slug)
    {
        $game = Game::where('slug', $slug)->firstOrFail();

        $highestScores = Score::selectRaw('users.username, MAX(scores.score) as score, MAX(scores.updated_at) as timestamp')
            ->join('users', 'scores.user_id', '=', 'users.id')
            ->join('game_versions', 'scores.game_version_id', '=', 'game_version.id')
            ->where('game_versions.game_id', $game->id)
            ->groupBy('users.id', 'users.username')
            ->orderByDesc('score')
            ->get();


        $scores =  $highestScores->map(function ($score) {
            return [
                'username' => $score->username,
                'score' =>  $score->score,
                'timestamp' => (new DateTime($score->timestamp))->format(DateTime::ATOM)
            ];
        });

        return response()->json([
            'scores' => $scores
        ], 200);
    }

    public function postScore(Request $request, $slug)
    {
        $validatedData = $request->validate([
            'score' => 'required|numeric|min:0'
        ]);

        $game = Game::where('slug', $slug)->firstOrFail();

        $latestGameVersion = $game->latestVersion;

        if(!$latestGameVersion) {
            return response()->json([
                'status' => 'not-found',
                'message' => 'Game version is not found '
            ], 401);
        }

        Score::create([
            'user_id' => auth()->id(),
            'game_version_id' => $latestGameVersion->id,
            'score' => $validatedData['score']
        ]);

        return response()->json([
            'status' => 'success'
        ], 201);
    }
}
