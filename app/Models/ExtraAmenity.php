<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExtraAmenity extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'is_available',
    ];
}
