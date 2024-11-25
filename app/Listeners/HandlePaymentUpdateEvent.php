<?php

namespace App\Listeners;

use App\Events\PaymentIsUpdated;
use App\Notifications\PaymentIsApprovedNotification;
use App\Notifications\PaymentIsRejectedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class HandlePaymentUpdateEvent
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
    public function handle(PaymentIsUpdated $event): void
    {
        $event->payment->load(['reservation']);

        if($event->payment->wasChanged('status')){
            if($event->payment->status == 'Rejected'){
                Notification::sendNow([$event->payment->reservation->user], new PaymentIsRejectedNotification($event->payment));
            }
            else{//if approved
                Notification::sendNow([$event->payment->reservation->user], new PaymentIsApprovedNotification($event->payment));
            }
        }
    }
}
