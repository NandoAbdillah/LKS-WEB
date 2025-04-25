<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\PegawaiNegeriSipil;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Mockery\Undefined;

use function PHPUnit\Framework\isNull;

class AuthController extends Controller
{
    public function login(Request $request) {
      $request->validate([
         'email' => 'required|email',
         'password' => 'required'
      ]);

      $admin = User::where('email', $request->email)->first();

      $token = null;

      if($admin && Hash::check($request->password, $admin->password))  {
        $token = $admin->createToken('admin-token')->plainTextToken;
        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user_type' => 'admin'
        ], 200);
      }

      $pns = PegawaiNegeriSipil::where('email', $request->email)->first();

      if($pns && Hash::check($request->password, $pns->password)) {
        $token = $pns->createToken('pns-token')->plainTextToken;
        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user_type' => 'pns'
        ], 200);
      }


      return response()->json([
        'status' => 'invalid',
        'message' => 'Wrong username or password'
      ], 401);

    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'success'
        ], 200);
    }
}
