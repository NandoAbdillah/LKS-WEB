<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\SocietyResource;
use App\Models\Society;
use Illuminate\Http\Request;

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

        $token  = md5($society->id . $society->name . config('app.key') . $society->born_date);

        $society->login_tokens = $token;
        $society->save();

        return response()->json([
            'name' => $society->name,
            'born_date' => $society->born_date,
            'gender' => $society->gender,
            'address' => $society->address,
            'token' => $token,
            'regional' => $society->regional
        ], 200);
    }

    public function logout(Request $request)
    {
        $token = $request->token;

        $loginToken = Society::where('login_tokens', $token)->first();

        if(!$loginToken)
        {
            return response()->json([
                'message' => 'Invalid token'
            ], 401);
        }

        $loginToken->login_tokens = NULL;
        $loginToken->save();

        return response()->json([
            'message' => 'Logout success'
        ], 200);
    }
}
