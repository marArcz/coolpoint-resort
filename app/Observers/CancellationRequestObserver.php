<?php

namespace App\Observers;

use App\Models\CancellationRequest;
use App\Models\Reservation;
use App\Models\User;
use App\Notifications\NewCancelRequestNotification;
use Illuminate\Support\Facades\Notification;

class CancellationRequestObserver
{
    /**
     * Handle the CancellationRequest "created" event.
     */
    public function created(CancellationRequest $cancellationRequest): void
    {
        $admins = User::whereHasRole('admin')->get();

        Notification::sendNow($admins,new NewCancelRequestNotification($cancellationRequest));
    }

    /**
     * Handle the CancellationRequest "updated" event.
     */
    public function updated(CancellationRequest $cancellationRequest): void
    {
        //
    }

    /**
     * Handle the CancellationRequest "deleted" event.
     */
    public function deleted(CancellationRequest $cancellationRequest): void
    {
        //
    }

    /**
     * Handle the CancellationRequest "restored" event.
     */
    public function restored(CancellationRequest $cancellationRequest): void
    {
        //
    }

    /**
     * Handle the CancellationRequest "force deleted" event.
     */
    public function forceDeleted(CancellationRequest $cancellationRequest): void
    {
        //
    }
}
