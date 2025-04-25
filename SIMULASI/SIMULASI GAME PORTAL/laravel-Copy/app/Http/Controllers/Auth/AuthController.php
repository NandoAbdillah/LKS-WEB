<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Administrator;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Exceptions\Handler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signin(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|min:4|max:60',
            'password' => 'required|min:5'
        ]);

        $user = User::where('username', $credentials['username']) ->first();

        if(!$user || !Hash::check($credentials['password'], $user->password)) {


            $admin = Administrator::where('username', $credentials['username'])->first();

            if(!$admin || !Hash::check($credentials['password'], $admin->password)) {
                return response()->json([
                    'status' => 'invalid',
                    'message' => 'Wrong username or password'
                ]);
            } else {
                $token = $admin->createToken('auth_token')->plaintTextToken;

                $admin->update([
                    'last_login_at' => Carbon::today()->toDateString()
                ]);

                return response()->json([
                    'status' => 'success',
                    'token' => 'token'
                ], 200);
            }



            return response()->json([
                'status' => 'invalid',
                'message' => 'Wrong username or password'
            ], 401);



        }


        $token = $user->createToken('auth_token')->plainTextToken;

        $user->update([
            'last_login_at' => Carbon::today()->toDateString()
        ]);

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
            'password' => Hash::make($credentials['password']),
            'last_login_at' => Carbon::today()->toDateString()
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'token' => $token
        ], 201);


    }

    public function signout(Request $request)
    {
        $token = $request->user()->currentAccessToken();

        $token->delete();


        return response()->json([
            'status' => 'success'
        ], 200);
    }
}


