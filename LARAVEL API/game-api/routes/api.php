<?php
// Api.php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\AdminController;



Route::prefix('v1')->group(
    function () {

        // Authentication

        Route::post('auth/signup', [AuthController::class, 'signup']);
        Route::post('auth/signin', [AuthController::class, 'signin']);
        Route::post('auth/signout', [AuthController::class, 'signout'])->middleware('auth:sanctum');



        // Protected Routes (Only for authenticated users)
        Route::middleware(['auth:sanctum'])->group(function () {

            Route::get('me', [AuthController::class, 'me']);
            // Sign Out
            Route::post('auth/signout', [AuthController::class, 'signout']);

            // Route untuk Game
            Route::prefix('games')->group(
                function () {
                    Route::post('{slug}/upload', [GameController::class, 'upload']);
                    Route::get('{slug}/scores', [GameController::class, 'highestScoresPerUser']);
                    Route::post('{slug}/scores', [GameController::class, 'postScore']);
                    Route::get('{slug}/versions', [GameController::class, 'allVersions']);
                    Route::get('serve/{slug}/{version}', [GameController::class, 'serveGameFile']);


                }
            );
            Route::apiResource('games', GameController::class);

            // Route untuk User
            Route::prefix('users')->group(
                function() {
                    Route::get('{username}', [UserController::class, 'getUserDetails']);
                }
            );


            // Admin-specific routes
            Route::middleware('admin')->group(function () {
                Route::get('admins', [AdminController::class, 'getAdmins']);
                Route::apiResource('users', UserController::class);
            });
        });
    }
);
