<?php

namespace App\Models;

use Database\Factories\RoomFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'min_people',
        'max_people',
        'double_decks',
        'beds',
        'price',
        'image',
        'time_in',
        'time_out'
    ];


    public function amenities(): HasMany
    {
        return $this->hasMany(RoomAmenity::class);
    }
    public function images(): HasMany
    {
        return $this->hasMany(RoomImage::class);
    }
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
    public static function newFactory(): Factory
    {
        return RoomFactory::new();
    }
    
}
