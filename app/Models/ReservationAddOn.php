<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Ramsey\Uuid\Type\Integer;

class ReservationAddOn extends Model
{
    use HasFactory;
    protected $with = ['amenity'];
    protected $append = ['total'];

    protected $fillable = [
        'amenity',
        'quantity',
        'price',
        'amenity_id',
        'reservation_id'
    ];

    public function totalAttribute()
    {
        return $this->price * $this->quantity;
    }

    public function amenity():BelongsTo
    {
        return $this->belongsTo(ExtraAmenity::class);
    }
}
