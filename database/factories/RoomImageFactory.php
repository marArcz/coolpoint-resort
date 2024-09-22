<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\RoomImage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoomImage>
 */
class RoomImageFactory extends Factory
{
    protected $model = RoomImage::class;
    private $images = [
        'room-1.jpg',
        'room-2.jpg',
        'room-3.jpg',
        'room-4.jpg',
    ];
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'room_id' => Room::factory(),
            'uri' => '/images/rooms/'  . $this->images[fake()->numberBetween(0,count($this->images) - 1)],
        ];
    }
}
