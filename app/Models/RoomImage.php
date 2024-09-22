<?php

namespace App\Models;

use Database\Factories\RoomImageFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RoomImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'uri',
        'room_id',
    ];

    public function room() : BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
    public static function newFactory(): Factory
    {
        return RoomImageFactory::new();
    }
}
