<?php 

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserBlocked
{
    public function handle(Request $request, Closure $next)
    {
        // Pastikan pengguna sudah diautentikasi
        $user = Auth::user();

        // Cek apakah pengguna diblokir
        if ($user && $user->is_blocked) {
            return response()->json([
                'status' => 'blocked',
                'message' => 'User blocked',
                'reason' => $user->block_reason ?? 'You have been blocked by an administrator',
            ], 403);
        }

        return $next($request); // Lanjutkan jika tidak diblokir
    }
}
