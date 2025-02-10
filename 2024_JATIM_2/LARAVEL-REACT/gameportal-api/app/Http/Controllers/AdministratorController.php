<?php

namespace App\Http\Controllers;

use App\Models\Admin\Administrator;
use Illuminate\Http\Request;

class AdministratorController extends Controller
{
    public function index() {
        $admins = Administrator::get(['username', 'last_login_at', 'created_at', 'updated_at']);

    
        return response()->json([
            'totalElements' => count($admins),
            'content' => $admins
        ], 200);
    }
}
