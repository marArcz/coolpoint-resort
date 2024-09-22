<?php

namespace App\Models;

use Database\Factories\RoomAmenityFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RoomAmenity extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'name'
    ];

    public function room() : BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public static function newFactory(): Factory
    {
        return RoomAmenityFactory::new();
    }
}
