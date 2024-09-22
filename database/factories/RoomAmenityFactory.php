<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\RoomAmenity;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoomAmenity>
 */
class RoomAmenityFactory extends Factory
{
    protected $model = RoomAmenity::class;
    private $values = ['Air conditioner', 'Free Karaoke', 'Own comfort room', 'Cable TV', 'Smart TV', 'Electric Fan'];
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'room_id' => Room::factory(),
            'name' => $this->values[fake()->numberBetween(0, count($this->values) - 1)],
        ];
    }
}
