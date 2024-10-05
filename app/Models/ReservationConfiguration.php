<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationConfiguration extends Model
{
    use HasFactory;

    protected $fillable = [
        'gcash_qr_code',
        'gcash_account_no',
        'gcash_account_name',
        'resort_rate'
    ];
}
