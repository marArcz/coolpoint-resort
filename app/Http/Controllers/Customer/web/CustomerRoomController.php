<?php
namespace App\Http\Controllers\Customer\Web;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\RoomAmenity;
use App\Models\RoomImage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = Room::with(['amenities','images'])->paginate(10);
        return Inertia::render('Customer/Rooms', compact('rooms'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Room $room)
    {
        $room->load(['amenities','images','reservations']);
        $date_from = $request->query('date_from');
        $date_to = $request->query('date_to');
        $adults = $request->query('adults',2);
        $children = $request->query('chilren',0);

        return Inertia::render('Customer/RoomDetails',compact('room','date_from','date_to','adults','children'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
