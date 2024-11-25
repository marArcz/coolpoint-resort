<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CancellationRequest extends Model
{
    use HasFactory;
    protected $fillable = [
        'gcash_account_name',
        'gcash_number',
        'refunded',
        'reason',
        'status',
        'reservation_id',
    ];

    public function reservation():BelongsTo
    {
        return $this->belongsTo(Reservation::class)->with(['user']);
    }
}
