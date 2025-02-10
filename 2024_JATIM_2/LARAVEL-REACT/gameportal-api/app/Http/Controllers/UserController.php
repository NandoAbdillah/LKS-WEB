<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {

        $users = User::get(['username', 'last_login_at', 'created_at', 'updated_at']);

        return response()->json([
            'totalElements' => count($users),
            'content' => $users
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);


        if(User::where('username', $validated['username'])->exists()){
            return response()->json([
                'status' => 'invalid',
                'message' => 'username is already exsist'
            ], 400);
        }

        $user = User::create([
            'username' => $validated['username'],
            'password' => Hash::make($validated['username'])
        ]);

        return response()->json([
            'status' => 'success',
            'username' => $user->username
        ], 201);
    }

    public function update(Request $request, $id) {

        $user = User::find($id);

        $request->validate([
            'username' => 'requiered',
            'password' => 'required'
        ]);

        if(User::where('username', $request->username)->where('id' , '!=', $id)->exists()) {
            return response()->json([
                'status' => 'Username is already exsist',
                'message' => 'Username already exists'
            ], 400);
        }   

        $user->update($request->all());
        $user->save();


        return response()->json([
            'status' => 'success',
            'username' => $user->username,
        ], 201);
        


    }

    public function destroy($id)
    {
        $user = User::find($id);
        
        if($user) {
            return response()->json([
                'status'=> 'not-found',
                'message' => 'User not found'
            ], 403);
        }

        $user->delete();

        return response()->noContent();
    }
}
