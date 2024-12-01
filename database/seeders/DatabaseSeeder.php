<?php

namespace Database\Seeders;

use App\Models\ReservationConfiguration;
use App\Models\Room;
use App\Models\RoomAmenity;
use App\Models\RoomImage;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // seed reservation configuration
        ReservationConfiguration::create([
            'gcash_qr_code' => '/images/gcash-qr.png',
            'gcash_account_no' => '09123456789',
            'gcash_account_name' => 'John Doe',
            'resort_rate' => 4000
        ]);
        // seed extra amenities
        $this->call(ExtraAmenitySeeder::class);
        $this->call(LaratrustSeeder::class);
        $this->call(AdminSeeder::class);
    }
}
