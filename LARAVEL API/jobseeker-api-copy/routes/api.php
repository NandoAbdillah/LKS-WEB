<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\JobApplyPositionController;
use App\Http\Controllers\JobApplySocietyController;
use App\Http\Controllers\JobCategoryController;
use App\Http\Controllers\JobVacancyController;
use App\Http\Controllers\ValidationController;
use App\Models\JobApplySociety;
use App\Models\JobVacancy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::prefix('auth')->group(function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('logout', [AuthController::class, 'logout']);
    });

    Route::middleware('md5token')->group(function () {
        Route::post('validation', [ValidationController::class, 'store']);
        Route::get('validations', [ValidationController::class, 'index']);

        Route::apiResource('job_vacancies', JobVacancyController::class);
        Route::apiResource('job_categories', JobCategoryController::class);


        Route::apiResource('applications', JobApplyPositionController::class);
    });
});
