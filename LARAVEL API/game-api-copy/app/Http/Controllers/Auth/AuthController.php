<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Administrator;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|min:4|max:60|unique:users',
            'password' => [
                'required',
                Password::min(5)
                ->max(8)
                ->mixedCase()
                ->numbers()
                ->symbols()
            ]
            ]);


        $user = User::create([
            'username' => $credentials['username'],
            'password' => Hash::make($credentials['password']),
            'last_login_at' => Carbon::now('UTC')
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'token' => $token
        ], 201);
    }

    public function signin(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|min:4|max:60',
            'password' => 'required|min:5|max:8'
        ]);

        $user = User::where('username', $credentials['username'])->first();

        if(!$user) {
            $user = Administrator::where('username', $credentials['username'])->first();
        }

        if(!$user || Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Wrong username or password'
            ], 401);
        }


        $token = $user->createToken('auth_token')->plainTextToken;

        $user->update([
            'last_login_at' => Carbon::now()
        ]);

        return response()->json([
            'status' => 'success',
            'token' => $token,
            'role' => $user instanceof Administrator ? 'administrator' : 'user'
        ], 200);
    }

    public function signout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success'
        ], 200);
    }


}
