<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\JobApplySocietyController;
use App\Http\Controllers\JobCategoryController;
use App\Http\Controllers\JobVacancyController;
use App\Http\Controllers\ValidationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;


Route::prefix('v1')->group(
    function()
    {

        Route::prefix('auth')->group(
            function()
            {
                Route::post('login', [AuthController::class, 'login']);
                Route::post('register', [AuthController::class, 'register']);
                Route::post('logout', [AuthController::class, 'logout']);


            }
        );

        Route::middleware('md5Token')->group(
            function ()
            {
                Route::apiResource('validations', ValidationController::class);
                Route::apiResource('/job_vacancies', JobVacancyController::class);
                Route::apiResource('/applications', JobApplySocietyController::class);
                Route::apiResource('/job_categories' , JobCategoryController::class);


            }
        );
    }
);
