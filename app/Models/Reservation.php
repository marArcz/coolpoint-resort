<?php

namespace App\Models;

use App\Events\NewReservationCreated;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class Reservation extends Model
{
    use HasFactory, SoftDeletes;

    protected $appends = ['isPaid','mStatus','balance','type_description'];
    protected $fillable = [
        'date_from',
        'date_to',
        'adults',
        'children',
        'room_id',
        'user_id',
        'status',
        'reason',
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
        $reservationsCount = Reservation::where('status', '=', 'Approved')
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
        return Reservation::where('status', '=', 'Approved')
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

    public function payments(): HasMany
    {
        return $this->HasMany(Payment::class);
    }

    public function addOns():HasMany
    {
        return $this->hasMany(ReservationAddOn::class);
    }

    public function cancellationRequest(): HasOne{
        return $this->hasOne(CancellationRequest::class);
    }
    public function getTypeDescriptionAttribute(){
        return $this->type == 'room'?'Room Reservation':'Resort Reservation';
    }
    public function getIsPaidAttribute():bool
    {
        return $this->payments()->where('status', '=', 'Confirmed')->exists();
    }
    public function getMStatusAttribute():string
    {
        if($this->cancellationRequest()->exists()){
            $cancellation_request = $this->cancellationRequest()->get()[0];
            if($cancellation_request->status == 'Approved'){
                return 'Cancelled';
            }else{
                return 'Pending for cancellation';
            }
        }
        if($this->status == 'Approved'){
            if($this->payments()->where('status', '=', 'Confirmed')->count() == 1){
                return 'Partial Payment';
            }
            else if($this->payments()->where('status', '=', 'Confirmed')->count() == 2){
                return 'Paid';
            }
            else{
                return 'Slot reserved';
            }
        }else{
            return $this->status;
        }
    }
    public function getBalanceAttribute(){
        $payments = $this->payments()->where('status','=','Confirmed')
                    ->get();
        $amount_paid = 0;
        foreach($payments as $payment){
            $amount_paid += $payment->amount;
        }

        return $this->total - $amount_paid;
    }

    public function scopeWhereDateFrom(Builder $query, Request $req):Builder
    {
        return $query->when($req->has('year'), fn(Builder $query) => $query->whereYear('date_from',$req->query('year')))
            ->when($req->has('month'), fn(Builder $query) => $query->whereMonth('date_from', $req->query('month')));
    }

}
