<?php

// EnsureAdmin

namespace App\Http\Middleware;

use App\Models\Administrator;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
  
    public function handle(Request $request, Closure $next): Response
    {   
        // Periksa apakah user adalah admin
        if(!$request->user() instanceof Administrator) {
            return response()->json([
                'status' => 'forbidden',
                'message' => 'You are not the administrator',
                'user_class' => get_class($request->user()), // Debugging
            ], 403);
        }
        return $next($request);
    }
}
