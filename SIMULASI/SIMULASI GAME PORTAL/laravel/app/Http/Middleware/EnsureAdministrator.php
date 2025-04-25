<?php

namespace App\Http\Middleware;

use App\Models\Administrator;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdministrator
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (!($request->user() instanceof Administrator)) {
            return response()->json([
                'status' => 'foridden',
                'message' => 'You are not the administrator'
            ], 403);
        }
        return $next($request);
    }
}
