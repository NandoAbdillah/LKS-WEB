<?php

namespace App\Http\Controllers;

use App\Models\Society;
use App\Http\Requests\StoreSocietyRequest;
use App\Http\Requests\UpdateSocietyRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SocietyController extends Controller
{
    public function login(Request $request)
    {

        $validation = Validator::make($request->all(), [
            'id_card_number' => 'required',
            'password' => 'required',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validation->errors()
            ], 422);
        }

        $data = Society::with('regional')->where('id_card_number', $request->id_card_number)->first();
        if ($data) {
            if (Hash::check($request->password, $data->password)) {
                $data->login_tokens = md5($data->id_card_number . date('Y-m-d H:i:s'));
                $data->save();
                return response()->json([
                    'message' => 'Login Success',
                    'data' => $data
                ], 200);
            }
        }
        return response()->json([
            'message' => 'ID Card Number or Password incorrect'
        ], 401);
    }

    public function logout(Request $request)
    {
        $token = $request->get('token');
        $data = Society::where('login_tokens', $token)->first();
        if ($data) {
            $data->login_tokens = null;
            $data->save();
            return response()->json([
                'message' => 'Logout Success'
            ], 200);
        }
        return response()->json([
            'message' => 'Invalid token'
        ], 401);
    }
}
