<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    use HasFactory, SoftDeletes;

    protected $with = ['room','payment'];

    protected $fillable = [
        'date_from',
        'date_to',
        'adults',
        'children',
        'room_id',
        'user_id',
        'status',
        'total',
        'reservation_no',
        'payment_method',
        'type' // [room | resort]
    ];

    // generates reservation no
    public static function newReservationNo(): string
    {
        $count = self::withTrashed()
            ->whereYear('created_at', '=', date('Y'))
            ->count();

        return date('y') . '-' . str_pad($count + 1, 4, '0',STR_PAD_LEFT);
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function payment():HasOne
    {
        return $this->hasOne(Payment::class);
    }
}
