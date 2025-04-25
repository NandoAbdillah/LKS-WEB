<?php

use App\Http\Controllers\AdministratorController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(
    function () {
        Route::prefix('auth')->group(
            function () {
                Route::post('signin', [AuthController::class, 'signin']);
                Route::post('signup', [AuthController::class, 'signup']);
            }
        );

        Route::middleware(['auth:sanctum'])->group(
            function () {
                Route::post('auth/signout', [AuthController::class, 'signout']);
                Route::get("me", [AuthController::class,'me']);

                Route::middleware('administrator')->group(
                    function () {
                        Route::apiResource('users', UserController::class);
                        Route::apiResource('admins', AdministratorController::class);
                    }
                );


                Route::apiResource('games', GameController::class);
                Route::get('games/{slug}/scores', [GameController::class, 'gameScore']);
                Route::post('games/{slug}/scores', [GameController::class, 'postScore']);
            }
        );

        Route::post('/games/{slug}/upload', [GameController::class, 'upload']);
    }
);
