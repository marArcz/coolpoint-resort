<?php

use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

// Artisan::command('inspire', function () {
//     $this->comment(Inspiring::quote());
// })->purpose('Display an inspiring quote')->hourly();



Artisan::command('cancel_reservations', function () {
    $reservations = Reservation::where('created_at', '<=', Carbon::now()->subHours(8))
    ->where('status','Approved')
    ->whereDoesntHave('payments',function(Builder $query){
        $query->where('status','=','Confirmed');
    })->update([
        'status' => 'Cancelled'
    ]);

    $this->comment("Success");
})->purpose('Cancel unpaid jobs')->schedule()->everyMinute();

Artisan::command('update_ongoing_reservations', function () {
    $reservations = Reservation::whereDate('date_from', '=', Carbon::today())
    ->where('status','Approved')
    ->whereHas('payments',function(Builder $query){
        $query->where('status','=','Confirmed');
    })
    ->update([
        'status' => 'Ongoing'
    ]);

    $this->comment("Finding reservations scheduled today");
})->purpose('Update ongoing reservations')->schedule()->everyMinute();
