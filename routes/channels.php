<?php

use App\Models\Reservation;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Request;

Broadcast::channel('admins.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
}, ['guards' => ['admin']]);

Broadcast::channel('customers.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
}, ['guards' => ['customer']]);

Broadcast::channel('reservations.{id}', function ($user, $id) {
    $reservation = Reservation::find($id);
    if($reservation){
        return $reservation->user_id == $user->id;
    }
    return false;
}, ['guards' => ['customer']]);
