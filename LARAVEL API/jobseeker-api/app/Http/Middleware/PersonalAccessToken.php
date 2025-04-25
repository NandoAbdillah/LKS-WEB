<?php

namespace App\Http\Middleware;

use App\Models\Md5Token;
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

        $record = Md5Token::where('token', $token)->first();

        if(!$record) {
            return response()->json([
                'message' => 'unauthorized user'
            ], 401);
        }

        $user = $record->tokenable;

        $request->attributes->set('user', $user);
        
        return $next($request);
    }
}
