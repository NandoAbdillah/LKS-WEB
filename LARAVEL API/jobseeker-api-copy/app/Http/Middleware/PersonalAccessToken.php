<?php

namespace App\Http\Middleware;

use App\Models\Society;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PersonalAccessToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $token = $request->query('token');

        $society = Society::where('login_tokens', $token)->first();

        if(!$society) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $request->attributes->set('user', $society);

        return $next($request);
    }
}
