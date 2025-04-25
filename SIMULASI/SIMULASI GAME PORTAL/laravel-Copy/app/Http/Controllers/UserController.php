<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();

        $content = $users->map(function ($user) {

            return [
                'username' => $user->username,
                'last_login_at' => $user->last_login_at,
                'created_at' => $user->created_at,
                'updated_at' => $user->update_at
            ];
        });

        return response()->json([
            'totalElements' => count($users),
            'content' => $content
        ], 200);
    }
    public function store(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|min:4|max:60',
            'password' => 'required|min:5|max:10'
        ]);


        if (User::where('username', $credentials['username'])->exists()) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Username already exists'
            ], 400);
        }

        $user = User::create([
            'username' => $credentials['username'],
            'password' => Hash::make($credentials['password'])
        ]);

        return response()->json([
            'status' => 'success',
            'username' => $user->username
        ], 201);
    }

    public function update(Request $request, $id)
    {

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 'not-found',
                'message' => 'User not-found'
            ], 404);
        }

        $credentials = $request->validate([
            'username' => 'required|min:4|max:60',
            'password' => 'required|min:5|max:10'
        ]);


        if (User::where('username', $credentials['username'])->where('id', '!=', $user->id)->exists()) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Username already exists'
            ], 400);
        }

        $user->update([
            'username' => $credentials['username'],
            'password' => Hash::make($credentials['password'])
        ]);

        return response()->json([
            'status' => 'success',
            'username' => $user->username
        ], 201);
    }

    public function show($username)
    {
        $user = User::where('username', $username)->first();

        if (!$user) {
            return response()->json([
                'status' => 'not-found',
                'message' => 'Game not found'
            ], 401);
        }

        $authoredGames = $user->authoredGames->map(function ($game) {
            return [
                'slug' => $game->slug,
                'title' => $game->title,
                'description' => $game->description
            ];
        });

        // $highScoresPerGame = $user->highestScorePerGame;

        $highScores = $user->highestScorePerGame->map(function ($score) {
            return [
                'game' => [
                'slug' => $score->gameVersion->game->slug,
                'title' => $score->gameVersion->game->title,
                'description' => $score->gameVersion->game->description
                ],
                'score' => $score->score,
                'timestamp' => $score->created_at
            ];
        });

        return response()->json([
            'username' => $user->username,
            'registeredTimestamp' => $user->created_at,
            'authoredGames' => $authoredGames,
            'highscores' => $highScores
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $user = User::find($id);

        if(!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $user->update([
            'deleted_at' => Carbon::today()->toDateString()
        ]);

        if($request->delete_reason) {
            $user->update([
                'delete_reason' => $request->delete_reason
            ]);
        }

        return response()->noContent();
    }
}
