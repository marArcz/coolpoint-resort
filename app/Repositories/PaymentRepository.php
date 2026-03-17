<?php

use App\Models\Reservation;

class PaymentRepository
{
    public function create(array $data, Reservation $reservation)
    {
        // create payment
      return $reservation->payments()->create([
            'method' => $data['method'],
            'type' => $data['type'],
            'amount' => $data['amount'],
            'payment_no' => "P $reservation->reservation_no" ,
            'status' => 'Pending',
            'receipt' => $data['receipt'],
            'is_refundable' => $data['is_refundable'],
        ]);

    }
}