<?php
// Usrcontroller

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{


    public function index()
    {
        $users = User::get(['username', 'last_login_at', 'created_at', 'updated_at']);

        return response()->json([
            'totalElements' => $users->count(),
            'content' => $users

        ], 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|min:4|max:60',
            'password' => 'required|min:8|max:10',
        ]);

        // Membuat pengguna baru

        if (User::where('username', $validatedData['username'])->exists()) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Username already exsist'
            ], 401);
        }

        $user = User::create([
            'username' => $validatedData['username'],
            'password' => Hash::make($validatedData['password'])
        ]);

        // Memberikan respon sukse 

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
                'status' => 'invalid',
                'message' => 'User not found'
            ], 400);
        }

        $validatedData = $request->validate([
            'username' => 'required|min:4|max:60',
            'password' => 'required|min:8|max:10'
        ]);

        if (User::where('username', $validatedData['username'])->where('id', '!=', $id)->exists()) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Username already exists'
            ], 400);
        }

        $user->update([
            'username' => $validatedData['username'],
            'message' => Hash::make($validatedData['password']),
        ]);

        return response()->json([
            'status' => 'success',
            'message'  => $user->username
        ], 201);
    }

    public function destroy($id)
    {

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 'not-found',
                'message' => 'User not found'
            ], 403);
        }

        $user->delete();

        return response()->noContent();
    }

    public function getUserDetails($username)
    {
        $user = User::where('username', $username)->first();

        if (!$user) {
            return response()->json([
                'status' =>  'not-found',
                'message' => 'User not found'
            ], 404);
        }

        // Ambil semua game yang dibuat oleh player minimal 1 game versi 

        $authoredGames = $user->hasMany(Game::class, 'created_by')
            ->with('latestVersion')
            ->get(['slug', 'title', 'description']);

        $highscores = $user->highScores()->get()->map(function ($score) {
            return [

                'game' => [
                    'slug' => $score->gameVersion->game->slug,
                    'title' => $score->gameVersion->game->title,
                    'description' => $score->gameVersion->game->description
                ],
                'score' => $score->score,
                'timestamp' => $score->timestamp,
            ];
        });

        return response()->json([
            'username' => $user->username,
            'registeredTimestamp' => $user->created_at,
            'authoredGames' => $authoredGames,
            'highscores' => $highscores
        ] , 200);
    }
}
