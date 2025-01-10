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
    ->where('status','Pending')
    ->whereDoesntHave('payments',function(Builder $query){
        $query->where('status','=','Confirmed');
    })->update([
        'status' => 'Cancelled'
    ]);

    $this->comment("Success");
})->purpose('Cancel unpaid jobs')->schedule()->everyMinute()->runInBackground();;

// Artisan::command('inspire2', function () {
//     $this->comment(Inspiring::quote());
// })->purpose('Display an inspiring quote')->everyTenSeconds();
