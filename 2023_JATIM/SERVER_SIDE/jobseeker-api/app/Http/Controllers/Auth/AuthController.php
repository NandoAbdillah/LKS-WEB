<?php

namespace App\Http\Controllers\Auth;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\SocietyResource;
use App\Models\Society;
use Illuminate\Foundation\Exceptions\Handler;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{


    // 
    public function login(Request $request)
    {
        $credentials = $request->validate(
            [
                'id_card_number' => 'required|string',
                'password' => 'required|string'
            ]
        );


        $society = Society::where('id_card_number', $credentials['id_card_number'])->first();

        if (!$society || !Hash::check($credentials['password'], $society->password)) {
            return response()->json([
                'stauts' => 'invalid',
                'message' => 'ID Card Number or Password incorrect'
            ], 401);
        }

        $society->tokens()->delete();

        $token =  $society->createToken('auth_token')->plainTextToken;

        return (new SocietyResource($society))->additional(['token' => $token]);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'id_card_number' => 'required|numeric',
            'password' => 'required',
            'born_date' => 'required|date',
            'gender' => 'required|in:male,female',
            'address' => 'required',
            'regional_id' => 'required|numeric',

        ]);

        $society = Society::create([
            'name' => $validated['name'],
            'id_card_number' => $validated['id_card_number'],
            'password' => Hash::make($validated['password']),
            'born_date' => $validated['born_date'],
            'gender' => $validated['gender'],
            'address' => $validated['address'],
            'regional_id' => $validated['regional_id']
        ]);

        $token = $society->createToken('auth_token')->plainTextToken;
        // $society->login_tokens = $token;
        // $society->save();

        return (new SocietyResource($society))->additional(['token' => $token]);
    }

    public function logout(Request $request)
    {

        $token = $request->user()->currentAccessToken();

        if (!$token) {
            return response()->json([
                'message' => 'Invalid token or token not found'
            ]);
        }

        $token->delete();

        return response()->json([
            'message' => 'Logout success'
        ], 200);

        // $request->user()->currentAccessToken()->delete();

        // return response()->noContent();

    }
}
