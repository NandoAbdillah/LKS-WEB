<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\FormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::prefix('v1')->group(
    function() {
       

        Route::prefix('auth')->group(
            function() {
                Route::post('login', [AuthController::class, 'login']);
                Route::post('logout', [AuthController::class, 'logout']);
            }
        );

        Route::middleware('auth:sanctum')->group(
            function() {
                Route::apiResource('forms', FormController::class);
            }
        );
    }
);
