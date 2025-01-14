<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\Admin\AdminCancellationRequestController;
use App\Http\Controllers\Admin\AdminCustomerController;
use App\Http\Controllers\Admin\AdminHomeController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminNotificationController;
use App\Http\Controllers\Admin\AdminPaymentController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\AdminReservationController;
use App\Http\Controllers\Admin\AdminRoomController;
use App\Http\Controllers\Admin\AdminRoomImageController;
use App\Http\Controllers\Admin\AdminSettingsController;
use App\Http\Controllers\Admin\ReservationConfigurationController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\CancellationRequestController;
use App\Http\Controllers\Customer\CustomerHomeController;
use App\Http\Controllers\Customer\CustomerReservationController;
use App\Http\Controllers\Customer\CustomerRoomController;
use App\Http\Controllers\ExtraAmenityController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationCancellationRequestController;
use App\Http\Controllers\ResortReservationController;
use App\Http\Controllers\Web\CartItemController;
use App\Mail\ReservationApprovedMailable;
use App\Mail\ReservationStatusUpdatedMailable;
use App\Models\CancellationRequest;
use App\Models\Reservation;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

Route::middleware(['verifyWhenAuth'])->group(function () {
    Route::get('/', [CustomerHomeController::class, 'index'])->name('home');
    Route::get('/about-us', AboutUsController::class)->name('about');
    Route::resource('rooms', CustomerRoomController::class);
    Route::get('availability/search', [AvailabilityController::class, 'search'])->name('availability.search');
    Route::resource('availability', AvailabilityController::class);
});

Route::get('/mailable', function () {
    $reservation = Reservation::with(['user'])->where('status', '=', 'Cancelled')->get()[0];
    return new ReservationStatusUpdatedMailable($reservation);
});

Route::middleware(['auth:customer', 'verified'])->group(function () {
    Route::get('reservations/{reservation}/confirm', [CustomerReservationController::class, 'confirm'])->name('reservations.confirm');
    Route::put('reservations/{reservation}/cancel', [CustomerReservationController::class, 'cancel'])->name('reservations.cancel');
    Route::post('reservations/{reservation}/checkout', [CustomerReservationController::class, 'checkout'])->name('reservations.checkout');
    Route::resource('reservations', CustomerReservationController::class);
    Route::resource('reservations.payment', PaymentController::class)->shallow();
    Route::resource('reservations.cancellation_requests', CancellationRequestController::class)->shallow();
    Route::get('resort/reservation', ResortReservationController::class)->name('resort_reservation');
    Route::put('notifications/read_all', [NotificationController::class, 'readAll'])->name('notifications.read_all');
    Route::resource('notifications', NotificationController::class);
});

Route::middleware(['auth:customer', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// admin routes
Route::middleware(['auth:admin', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', AdminDashboardController::class)->name('dashboard');
    Route::resource('rooms.room_images', AdminRoomImageController::class)->shallow();
    Route::put('rooms/update/photo', [AdminRoomController::class,'changePhoto'])->name('rooms.change.photo');
    Route::resource('rooms', AdminRoomController::class);
    Route::get('reservations/calendar', [AdminReservationController::class, 'reservationsCalendar'])->name('reservations.index.calendar');
    Route::resource('reservations', AdminReservationController::class);
    Route::resource('payments', PaymentController::class);
    Route::put('cancellation_requests/{cancellation_request}/approve', [AdminCancellationRequestController::class, 'approve'])->name("cancellation_requests.approve");
    Route::resource('reservations.cancellation_requests', CancellationRequestController::class)->shallow();
    Route::resource('users', AdminCustomerController::class);
    Route::put('notifications/read_all', [NotificationController::class, 'readAll'])->name('notifications.read_all');
    Route::resource('notifications', AdminNotificationController::class);
    Route::resource('settings', AdminSettingsController::class);
    Route::resource('reservation_configurations', ReservationConfigurationController::class);
    Route::resource('extra_amenities', ExtraAmenityController::class);
    Route::resource('profile', AdminProfileController::class)->parameters([
        'profile' => 'user'
    ]);
    Route::resource('reservation.payments', AdminPaymentController::class);
});

Route::get('/files/{folder}/{file}', FileController::class)->name('file.serve');


require __DIR__ . '/auth.php';
