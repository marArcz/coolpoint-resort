<?php

use App\Http\Controllers\Customer\CustomerHomeController;
use App\Http\Controllers\Customer\CustomerReservationController;
use App\Http\Controllers\Customer\CustomerRoomController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::name('customer.')->group(function(){
    Route::get('/', [CustomerHomeController::class, 'index'])->name('home');
    Route::resource('rooms', CustomerRoomController::class);
    Route::resource('reservations', CustomerReservationController::class);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
