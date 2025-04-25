<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckUserBlocked
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $user = $request->user();

        if($user->deleted_at !== null) {
            return response()->json([
                'status' => 'blocked',
                'message' => 'User blocked',
                'reason' => $user->delete_reason ?? 'You have been blocked by an administrator'
            ], 403);
        }

        return $next($request);
    }
}
