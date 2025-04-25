<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Administrator;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function me()
    {

        $me = Auth::user();
        return response()->json([
            'status' => 'success',
            'me' => $me
        ], 200);
    }
    public function signUp(Request $request)
    {
        $request->validate([
            'username'  => 'required|unique:users|min:4|max:60',
            'password' => 'required|min:5|max:8'
        ]);

        $user = User::create([
            'username' => $request->username,
            'last_login_at' => Carbon::now(),
            'password' => Hash::make($request->password)
        ]);

        $token  = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'token' => $token,
        ], 201);
    }

    public function signin(Request $request)
    {
        // Validasi input
        $credentials = $request->validate([
            'username' => 'required|min:4|max:60',
            'password' => 'required|min:5',
        ]);

        // Cari di tabel users
        $user = User::where('username', $credentials['username'])->first();

        // Jika tidak ditemukan di users, cari di administrators
        if (!$user) {
            $user = Administrator::where('username', $credentials['username'])->first();
        }

        // Jika user tidak ditemukan atau password salah
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Wrong username or password',
            ], 401);
        }

        // Generate token untuk sesi
        $token = $user->createToken('auth_token')->plainTextToken;

        $user->update([
            'last_login_at' => Carbon::now()
        ]);

        return response()->json([
            'status' => 'success',
            'token' => $token,
            'role' => $user instanceof Administrator ? 'administrator' : 'user',
        ], 200);
    }

    public function signout(Request $request) {

        // Menghapus token login berdasarkan token barier yang sudah didapat ketika login atau daftar
        // $request->user()->tokens()->delete();
        $request->user()->currentAccessToken()->delete();


        return response()->json([
            'status' => 'success'
        ], 200);
    }
}
