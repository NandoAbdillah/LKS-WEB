<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Society;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'id_card_number' => 'required',
            'password' => 'required'
        ]);

        $society = Society::where('id_card_number', $credentials['id_card_number'])->first();

        if (!$society || $society->password !== $credentials['password']) {
            return response()->json([
                'message' => 'ID Card Number or Password incorrect'
            ], 401);
        }

        $token = md5($society->name . $society->born_date . config('app.key') . $society->gender);

        $society->login_tokens = $token;
        $society->save();

        return response()->json([
            'name' => $society->name,
            'born_date' => $society->born_date,
            'gender' => $society->gender,
            'address' => $society->address,
            'token' => $token,
            'regional' => $society->regional,
        ], 200);
    }

    public function logout(Request $request)
    {
        $token = $request->query('token');

        $society = Society::where('login_tokens', $token)->first();

        if (!$society) {
            return response()->json([
                'message' => 'Invalid token'
            ], 401);
        }

        return response()->json([
            'message' => 'Logout success'
        ], 200);
    }
}
