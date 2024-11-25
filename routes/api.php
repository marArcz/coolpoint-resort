<?php

use App\Http\Controllers\Admin\AdminCancellationRequestController;
use App\Http\Controllers\Api\ApiReservationController;
use App\Http\Controllers\Api\ApiRevenueController;
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// admin routes
Route::middleware(['auth:sanctum'])->name('api.')->group(function () {
    Route::resource('reservations', ApiReservationController::class);
    Route::get('revenue', ApiRevenueController::class)->name('revenue.index');
    Route::resource('notifications', NotificationController::class);
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('cancellation_requests', AdminCancellationRequestController::class);
    });
});
