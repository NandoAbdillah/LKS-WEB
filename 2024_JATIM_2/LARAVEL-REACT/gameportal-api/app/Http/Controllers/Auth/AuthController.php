<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin\Administrator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signin(Request $request)
    {

        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);
        $user = User::where('username', $credentials['username'])->first();


        if (!$user) {
            $auser = Administrator::where('username', $credentials['username'])->first();
        }

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Wrong username or password'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' =>  'success',
            'token' => $token
        ], 200);
    }

    public function signup(Request $request)
    {

        $validated = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'password' => Hash::make($validated['password'])
        ]);

        $token =  $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'token' =>  $token,
            'role' => $user instanceof Administrator ? 'administrator' : 'user'
        ], 201);
    }

    public function signout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();


        return response()->json([
            'status' => 'success'
        ], 200);
    }
}
