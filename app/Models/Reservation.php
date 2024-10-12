<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Date;

class Reservation extends Model
{
    use HasFactory, SoftDeletes;

    protected $with = ['room', 'payment','addOns'];

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

        return date('y') . '-' . str_pad($count + 1, 4, '0', STR_PAD_LEFT);
    }

    public static function haveReservations(Carbon $dateStart, Carbon $dateEnd): bool
    {
        // Query to fetch reservations that overlap with the given date range
        $reservationsCount = Reservation::where('status', '=', 'Confirmed')
            ->where(function ($query) use ($dateStart, $dateEnd) {
                $query->whereBetween('date_from', [$dateStart, $dateEnd])
                    ->orWhereBetween('date_to', [$dateStart, $dateEnd])
                    ->orWhere(function ($query) use ($dateStart, $dateEnd) {
                        $query->where('date_from', '<=', $dateStart)
                            ->where('date_to', '>=', $dateEnd);
                    });
            })->count();

        return $reservationsCount > 0;
    }
    public static function scheduledWithin(Carbon $dateStart, Carbon $dateEnd)
    {
        // Query to fetch reservations that overlap with the given date range
        return Reservation::where('status', '=', 'Confirmed')
            ->where(function ($query) use ($dateStart, $dateEnd) {
                $query->whereBetween('date_from', [$dateStart, $dateEnd])
                    ->orWhereBetween('date_to', [$dateStart, $dateEnd])
                    ->orWhere(function ($query) use ($dateStart, $dateEnd) {
                        $query->where('date_from', '<=', $dateStart)
                            ->where('date_to', '>=', $dateEnd);
                    });
            });
    }

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }

    public function addOns():HasMany
    {
        return $this->hasMany(ReservationAddOn::class);
    }
}
