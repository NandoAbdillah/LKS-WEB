<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SanctumCustomResponse
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

        // Pastikan token valid menggunakan Sanctum
        if (!Auth::check()) {
            return response()->json([
                'status' => 'unauthenticated',
                'message' => 'Invalid token',
            ], 401);
        }

        return $next($request); // Lanjutkan jika token valid
    }
}
