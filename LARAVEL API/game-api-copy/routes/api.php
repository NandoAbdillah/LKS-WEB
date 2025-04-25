<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(
    function () {

        Route::prefix('auth')->group(
            function () {
                Route::post('signin', [AuthController::class, 'signin']);
                Route::post('signup', [AuthController::class, 'signup']);
                Route::post('signout', [AuthController::class, 'signout']);
            }
        );

        Route::middleware(['check.user','auth:sanctum'])->group(
            function () {

                Route::get('me', [AuthController::class, 'me']);

                Route::middleware('admin')->group(
                    function() {

                        // Route::get('admins')
                    }
                );
            }
        );
    }
);
