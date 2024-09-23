<?php

use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\Customer\Web\CustomerHomeController;
use App\Http\Controllers\Customer\Web\CustomerReservationController;
use App\Http\Controllers\Customer\Web\CustomerRoomController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Web\CartItemController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

Route::middleware(['verifyWhenAuth'])->group(function () {
    Route::get('/', [CustomerHomeController::class, 'index'])->name('home');
    Route::resource('rooms', CustomerRoomController::class);
    Route::get('availability/search', [AvailabilityController::class,'search'])->name('availability.search');
    Route::resource('availability', AvailabilityController::class);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('reservations/{reservation}/confirm', [CustomerReservationController::class, 'confirm'])->name('reservations.confirm');
    Route::put('reservations/{reservation}/cancel', [CustomerReservationController::class, 'cancel'])->name('reservations.cancel');
    Route::post('reservations/{reservation}/checkout', [CustomerReservationController::class, 'checkout'])->name('reservations.checkout');
    Route::resource('reservations', CustomerReservationController::class);
    Route::resource('reservations.payment', PaymentController::class)->shallow();
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
