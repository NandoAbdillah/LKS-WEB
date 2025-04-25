<?php

namespace App\Http\Middleware;

use App\Models\Administrator;
use Closure;
use Illuminate\Foundation\Exceptions\Handler;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {


        if(!$request->user instanceof Administrator) {

            return response()->json([
                'status' => 'forbidden',
                'message' => 'You are not the administrator'
            ], 403);
        }

        return $next($request);
    }
}
