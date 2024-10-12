<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [];
        // return [
        //     'date_from' => $this->date_from,
        //     'date_to'=> $this->date_to,
        //     'adults'=> $this->adults,
        //     'children'=> $this->children,
        //     'room_id'=> $this->room_id,
        //     'user_id',
        //     'status',
        //     'total',
        //     'reservation_no',
        //     'payment_method',
        //     'type'
        // ];
    }
}
