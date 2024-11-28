<?php

namespace App\Listeners;

use App\Events\ReservationHasExpired;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class HandleReservationHasExpired
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ReservationHasExpired $event): void
    {
        $event->reservation->update([
            'status' => 'Cancelled'
        ]);
    }
}
