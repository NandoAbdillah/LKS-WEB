<?php

namespace App\Http\Controllers;

use App\Models\Administrator;
use App\Http\Requests\StoreAdministratorRequest;
use App\Http\Requests\UpdateAdministratorRequest;

class AdministratorController extends Controller
{
   public function index()
   {

    $admins = Administrator::all();

    $content = $admins->map(function ($admin) {
        return [
            'username' => $admin->username,
            'last_login_at' => $admin->last_login_at,
            'created_at' => $admin->created_at,
            'updated_at' => $admin->updated_at
        ];
    });

    return response()->json([
        'totalElements' => count($admins),
        'content' => $content
    ], 200);
   }
}
