<?php

namespace App\Listeners;

use App\Events\ReservationUpdated;
use App\Models\Reservation;
use App\Models\User;
use App\Notifications\ReservationApprovedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class SendReservationStatusNotification
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
    public function handle(ReservationUpdated $event): void
    {
        $reservation = $event->reservation;
        $reservation->load(['payment']);

        $user = User::find($reservation->user_id);
        if($user && $reservation->wasChanged(['status'])){
            Notification::sendNow([$user], new ReservationApprovedNotification($event->reservation));
        }

        // todo: send notification to user about payment having been reviewed.
        if($user && $reservation->payment->wasChanged(['status'])){

        }
    }
}
