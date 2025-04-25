<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Administrator;

class AdminController extends Controller
{
    public function getAdmins()
    {
        // Ambil semua pengguna dengan role "admin"

        $admins = Administrator::select('username', 'last_login_at', 'created_at', 'updated_at')
            ->get();

        // Memberikan respon degan format sesuai soal 
        return response()->json([
            'totalElements' => $admins->count(),
            'content' => $admins
        ], 200);
    }
}
