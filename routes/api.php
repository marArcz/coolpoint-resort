<?php

use App\Http\Controllers\Api\ApiReservationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// admin routes
Route::middleware(['auth:sanctum'])->name('api.')->group(function () {
    Route::resource('reservations', ApiReservationController::class);
});
