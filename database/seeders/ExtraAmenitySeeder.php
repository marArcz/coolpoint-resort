<?php

namespace Database\Seeders;

use App\Models\ExtraAmenity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExtraAmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $amenitites = ['Extra Chairs','Slippers','Bathrobes'];

        foreach($amenitites as $amenity){
            ExtraAmenity::create([
                'name'=>$amenity,
                'price'=>100
            ]);
        }
    }
}
