<?php

use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\SocietyController;
use App\Http\Controllers\SpotController;
use App\Http\Controllers\VaccinationController;
use App\Models\Consultation;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [SocietyController::class, 'login']);
Route::post('/logout', [SocietyController::class, 'logout']);
Route::middleware('auth.token')->group(function () {
    Route::get('/consultations', [ConsultationController::class, 'index']);
    Route::post('/consultations', [ConsultationController::class, 'store']);
    Route::resource('/spots', SpotController::class)->only(['index', 'show']);
    Route::resource('/vaccinations', VaccinationController::class)
        ->only(['index', 'store']);
});
