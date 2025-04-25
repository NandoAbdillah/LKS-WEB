<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\MutasiController;
use App\Http\Controllers\PegawaiNegeriSipilController;
use App\Http\Controllers\PermintaanController;
use App\Http\Controllers\ProvinsiController;
use App\Models\PegawaiNegeriSipil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::prefix('v1')->group(function () {

    Route::middleware('auth:sanctum')->group(
        function () {
            Route::prefix('pns')->group(
                function () {
                    Route::get('profile', [PegawaiNegeriSipilController::class, 'me']);
                    Route::get('mutasi', [PegawaiNegeriSipilController::class, 'mutationHist']);
                    Route::get('mutasi/{id}', [PegawaiNegeriSipilController::class, 'mutationHistById']);
                    Route::get('permintaan', [PegawaiNegeriSipilController::class, 'allRequest']);
                    Route::post('permintaan', [PegawaiNegeriSipilController::class, 'storeRequest']);
                    Route::get('permintaan/{id}', [PegawaiNegeriSipilController::class, 'requestById']);
                }
            );

           Route::prefix('admin')->group(
            function() {
                Route::apiResource('pns', PegawaiNegeriSipilController::class);


                Route::get('mutasi/latest', [MutasiController::class, 'latest']);
                
                Route::apiResource('mutasi', MutasiController::class);



                Route::apiResource('permintaan', PermintaanController::class)->only(['index', 'show', 'destroy']);

                Route::put('permintaan/{id}/approve', [PermintaanController::class, 'approve']);
                Route::put('permintaan/{id}/reject', [PermintaanController::class, 'reject']);

            }
        );

        Route::prefix('wilayah')->group(
            function() {
                Route::get('/', [ProvinsiController::class, 'fullWilayah']);
                Route::get('provinsi', [ProvinsiController::class, 'provinsi']);
                Route::get('kabupaten', [ProvinsiController::class, 'kabupaten']);
                Route::get('kecamatan', [ProvinsiController::class, 'kecamatan']);
                Route::get('desa', [ProvinsiController::class, 'desa']);
            }
        );
        }
    );

    Route::prefix('auth')->group(
        function () {
            Route::post('login', [AuthController::class, 'login']);
            Route::post('logout', [AuthController::class, 'logout']);
        }
    );
});
