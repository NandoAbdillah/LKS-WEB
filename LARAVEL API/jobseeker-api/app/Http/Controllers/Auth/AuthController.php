<?php

namespace App\Http\Controllers\Auth;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\RegionalResource;
use App\Http\Resources\SocietyResource;
use App\Models\Md5Token;
use App\Models\Society;
use Illuminate\Foundation\Exceptions\Handler;
use Illuminate\Support\Facades\Hash;

use function PHPSTORM_META\map;

class AuthController extends Controller
{


    public function login(Request $request)
    {
        $credentials = $request->validate([
            'id_card_number' => 'required',
            'password' => 'required|min:5'
        ]);

        $society = Society::where('id_card_number', $credentials['id_card_number'])->first();

        if (!$society || !Hash::check($credentials['password'], $society->password)) {
            return response()->json([
                'message' => 'ID Card Number or Password incorrect'
            ], 401);
        }

        $token = md5($society->id . $society->name . config('app.key') . microtime());

        Md5Token::where('tokenable_type', get_class($society))
                ->where('tokenable_id', $society->id)
                ->where('name', 'token-md5')
                ->delete();

        Md5Token::create([
            'tokenable_type' => get_class($society),
            'tokenable_id' => $society->id,
            'name' => 'token-md5',
            'token' => $token,
            'abilities' => json_encode(['*'])
        ]);

        return response()->json([
            'name' => $society->name,
            'born_date' => $society->born_date,
            'gender' => $society->address,
            'token' => $token,
            'regional' => $society->regional
        ], 200);
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

        // return (new SocietyResource($society))->additional(['token' => $token]);

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
        $token = $request->query('token');

        if (!$token) {
            return response()->json([
                'message' => 'Invalid token'
            ], 401);
        }

        $currentToken = Md5Token::where('token', $token)->first();

        if(!$currentToken) {
            return response()->json([
                'message' => 'Invalid token'
            ], 401);
        }

        $currentToken->delete();

        return response()->json([
            'message' => 'Logout success'
        ], 200);


    }
}
