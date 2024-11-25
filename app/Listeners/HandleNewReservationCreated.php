<?php

namespace App\Listeners;

use App\Events\NewReservationCreated;
use App\Models\User;
use App\Notifications\NewReservation;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class HandleNewReservationCreated
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
    public function handle(NewReservationCreated $event): void
    {
        // get admins
        $users = User::whereHasRole('admin')->get();
        Notification::sendNow($users, new NewReservation($event->reservation));
    }
}
