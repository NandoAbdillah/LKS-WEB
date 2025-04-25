<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Cek apakah token ada
        if (!$request->bearerToken()) {
            return response()->json([
                'status' => 'unauthenticated',
                'message' => 'Missing token',
            ], 401);
        }

        // Token ada tetapi tidak valid
        if (!Auth::check()) {
            return response()->json([
                'status' => 'unauthenticated',
                'message' => 'Invalid token',
            ], 401);
        }

        // Cek apakah pengguna diblokir
        $user = Auth::user();
        if ($user->is_blocked) {
            return response()->json([
                'status' => 'blocked',
                'message' => 'User blocked',
                'reason' => $user->block_reason ?? 'No reason provided',
            ], 403);
        }

        // Lanjutkan request jika semua validasi lolos
        return $next($request);
    }
}
