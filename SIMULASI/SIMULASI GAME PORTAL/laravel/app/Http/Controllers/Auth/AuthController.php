<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Administrator;
use App\Models\User;
use Illuminate\Foundation\Exceptions\Handler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function me()
    {
        $user = Auth::user();

        return response()->json([
            'me' => $user,
            'role' => $user instanceof Administrator ? 'administrator' : 'user'
        ], 200);
    }


    public function signin(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|min:4|max:60',
            'password' => 'required|min:5'
        ]);

        $user = User::where(
            'username',
            $credentials['username'],
        )->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {


            $admin = Administrator::where(
                'username',
                $credentials['username'],
            )->first();

            if (!$admin || ! Hash::check($credentials['password'], $admin->password)) {

                return response()->json([
                    'status' => 'invalid',
                    'message' => 'Wrong username or password'
                ], 401);
            } else {


                $token = $admin->createToken('auth_token')->plainTextToken;

                return response()->json([
                    'status' => 'success',
                    'token' => $token
                ], 200);
            }


            return response()->json([
                'status' => 'invalid',
                'message' => 'Wrong username or password'
            ], 401);
        }


        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'token' => $token
        ], 200);
    }

    public function signup(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|unique:users,username|min:4|max:60',
            'password' => 'required|min:5|max:10'
        ]);

        $user = User::create([
            'username' => $credentials['username'],
            'password' => Hash::make($credentials['password'])
        ]);


        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'token' => $token
        ], 200);
    }

    public function signout(Request $request)
    {

        // Handler
        $token = $request->user()->currentAccessToken();

        // if(!$token)
        // {

        // }

        $token->delete();

        return response()->json([
            'status' => 'success'
        ], 200);
    }
}
