<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Foundation\Exceptions\Handler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request) {
        $credentials = $request->validate([
           'email' => 'required|email',
           'password' => 'required|min:5'
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if(!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Email or password incorrect'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login success',
            'user' =>  (new UserResource($user))->additional(['accessToken' => $token])
        ], 200);
    }

    // public function register(Request $request) {
    //    $credentials = $request->validate([
    //     ''
    //    ])
    // }

    public function logout(Request $request) {
        $token = $request->user()->currentAccessToken();

        if(!$token) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        $token->delete();


        return response()->json([
            'message' => 'Logout success'
        ], 200);
    }
}
