<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Http\Requests\StoreGameRequest;
use App\Http\Requests\UpdateGameRequest;
use App\Models\GameVersion;
use App\Models\Score;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken;

class GameController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page', 0);
        $size = $request->query('size', 10);
        $sortBy = $request->query('sortBy', 'title');
        $sortDir = $request->query('sortDir', 'asc');

        $request->validate([
            'page' => 'numeric|min:0',
            'size' => 'numeric|min:1',
            'sortBy' => 'in:title,popular,uploddate',
            'sortDir' => 'in:asc,desc'
        ]);

        $offset = $size * $page;

        if ($sortBy === 'title') {
            $games = Game::orderBy('title', $sortDir)
                ->withSum('scores', 'score')
                ->skip($offset)
                ->take($size)
                ->get();
        } else if ($sortBy === 'uploaddate') {
            $games = Game::withSum('scores', 'score')
                ->withMax('versions', 'created_at')
                ->orderBy('versions_max_created_at', $sortDir)
                ->skip($offset)
                ->take($size)
                ->get();
        } else {
            $games = Game::withSum('scores', 'score')
                ->orderBy('scores_sum_score')
                ->skip($offset)
                ->take($size)
                ->get();
        }


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
            'totalElements' => count($games),
            'content' => $content
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:3|max:60',
            'description' => 'required|min:0|max:200'
        ]);


        $slug = Str::slug($request->title);

        if (Game::where('slug', $slug)->exists()) {
            return response()->json([
                'status' => 'Invalid',
                'message' => 'Game title already exists'
            ], 400);
        }

        Game::create([
            'title' => $request->title,
            'slug' => $slug,
            'created_by' => Auth::id(),
            'description' => $request->description
        ]);

        return response()->json([
            'status' => 'success',
            'slug' => $slug
        ], 201);
    }

    public function show($slug)
    {
        $game = Game::where('slug', $slug)
            ->withSum('scores', 'score')
            ->first();


        return response()->json([
            'slug' => $game->slug,
            'title' => $game->title,
            'description' => $game->description,
            'thumbnail' => $game->latestVersion->thumbnail,
            'uploadTimestamp' => $game->latestVersion->created_at,
            'author' => $game->author,
            'scoreCount' => $game->scores_sum_score,
            'game_path' => $game->latestVersion->storage_path
        ]);
    }


    public function upload(Request $request, $slug)
    {
        $request->validate([
            'zipfile' => 'required|mimes:zip',
            'thumbnail' => 'sometimes|mimes:jpg,png,jpeg|max:2048',
            'token' => 'required'
        ]);

        $accessToken = PersonalAccessToken::findToken($request->input('token'));

        if (!$accessToken) {
            return response()->json([
                'message' => 'Invalid token'
            ], 401);
        }


        $user = $accessToken->tokenable;
        Auth::login($user);

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

        if (!$latestVersion) {
            $newVersion = 'v1';
        } else {
            $newVersion = 'v' . ((int) substr($latestVersion, 1) + 1);
        }


        $gameVersion = GameVersion::create([
            'game_id' => $game->id,
            'version' => $newVersion,
            'storage_path' => "games/" . $game->id . "/" . $newVersion . "/",
            'thumbnail' =>   "thumbnails/" . $game->id . "/" . $newVersion . "/",
        ]);

        if ($request->file('zipfile')) {
            $zipfile = $request->file('zipfile');
            $filename = $game->slug . "-" . $newVersion . ".zip";
            $zipfile->storeAs("public/games/$game->id/$newVersion/", $filename);
        }

        if ($request->file('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $thumbnail->storeAs("public/thumbnails/$game->id/$newVersion", $thumbnail->hashName());
        }

        return response()->json([
            'status' => 'success'
        ], 200);
    }


    public function update(Request $request, $slug)
    {
        $game = Game::where('slug', $slug)->first();

        if (!$game) {
            return response()->json([
                'status' => 'not-found',
                'message' => ' Game not-found'
            ], 404);
        }

        if ($game->created_by !== Auth::id()) {
            return response()->json([
                'status' => 'forbidden',
                'message' => 'You are not the game author'
            ], 403);
        }

        $validated =  $request->validate([
            'title' => 'required|min:3|max:60',
            'description' => 'required|min:0|max:200',
        ]);

        $game->update([
            'title' => $validated['title'],
            'description' => $validated['description']
        ]);

        return response()->json([
            'status' => 'success'
        ], 200);
    }

    public function destroy($slug)
    {
        $game = Game::where('slug', $slug)->first();

        if (!$game) {
            return response()->json([
                'status' => 'not-found',
                'message' => ' Game not-found'
            ], 404);
        }

        if ($game->created_by !== Auth::id()) {
            return response()->json([
                'status' => 'forbidden',
                'message' => 'You are not the game author'
            ], 403);
        }


        DB::transaction(
            function () use ($game) {
                $versionIds = $game->versions()->pluck('id');
                Score::whereIn('game_version_id', $versionIds)->delete();
                Game::whereIn('id', $versionIds)->delete();

                $game->delete();
            }
        );

        return response()->noContent();
    }

    public function scoreByUser($slug)
    {
        $game = Game::where('slug', $slug)->first();

        if (!$game) {
            return response()->json([
                'status'  => 'not-found',
            ], 404);
        }


    }

    public function gameScore($slug)
    {
        $game = Game::where('slug', $slug)->first();


        if(!$game) {
            return response()->json([
                'message'  => 'game not found'
            ], 404);
        }

        $scores = $game->scores()->orderBy('score', 'desc')->get();

        return response()->json([
            'score' => $scores->map(function($score) {
                return [
                    'username' => $score->user->username,
                    'score' => $score->score,
                    'timestamp' => $score->created_at
                ];
            })
        ], 200);
    }

    public function postScore(Request $request , $slug)
    {
        $game = Game::where('slug', $slug)->first();

        $request->validate([
            'score' => 'required|min:0'
        ]);

        if(!$game) {
            return response()->json([
                'message' => 'game not found'
            ], 404);

        }

        $score = Score::create([
            'game_version_id' => $game->latestVersion->id,
            'user_id' => Auth::id(),
            'score' => $request->score
        ]);

        return response()->json([
            'status' => 'success'
        ], 201);
    }
}
