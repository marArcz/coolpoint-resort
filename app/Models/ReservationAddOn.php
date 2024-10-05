<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationAddOn extends Model
{
    use HasFactory;

    protected $fillable = [
        'amenity',
        'quantity',
        'price',
        'amenity_id',
        'reservation_id'
    ];
}
