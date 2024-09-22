<?php

namespace Database\Seeders;

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
        // User::factory(10)->create();
        Room::factory()
            ->count(6)
            ->has(RoomAmenity::factory()->count(4),'amenities')
            ->has(RoomImage::factory()->count(2),'images')
            ->create();
    }
}
