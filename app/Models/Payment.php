<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'method',
        'amount',
        'payment_no',
        'status',
        'reservation_id',
        'receipt',
        'type',
        'is_refundable',
        'is_refunded',
        'proof_of_refund',
        'notes'
    ];

    protected $casts = [
        'is_refundable' => 'boolean',
        'is_refunded' => 'boolean',
    ];

    public function reservation():BelongsTo
    {
        return $this->belongsTo(Reservation::class)->with(['user']);
    }
}
