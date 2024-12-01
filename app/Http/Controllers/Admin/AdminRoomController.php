<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $rows = $request->query('rows',5);
        $rooms = Room::paginate($rows);
        return Inertia::render('Admin/ViewAllRooms', compact('rooms','rows'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AddNewRoom');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'main_photo' => ['required', 'file'],
            'name' => ['required'],
            'min_people' => ['required'],
            'max_people' => ['required'],
            'beds' => ['required'],
            'price' => ['required'],
            'additional_photos' => ['required'],
        ]);

        $roomData['image'] = '/storage/' . $request->file('main_photo')->store('rooms');
        $roomData['name'] = $request->input('name');
        $roomData['min_people'] = $request->integer('min_people');
        $roomData['max_people'] = $request->integer('max_people');
        $roomData['description'] = $request->input('description');
        $roomData['beds'] = $request->integer('beds');
        $roomData['price'] = $request->integer('price');

        $newRoom = new Room($roomData);
        $newRoom->save();

        if ($newRoom) {
            if ($request->has('amenities')) {
                $amenities = $request->input('amenities');
                foreach ($amenities as $amenity) {
                    $newRoom->amenities()->create([
                        'name' => $amenity
                    ]);
                }
            }

            if ($request->has('additional_photos')) {
                $additionalPhotos = $request->file('additional_photos');
                foreach ($additionalPhotos as $photo) {
                    // Save or process each file
                    $path = '/storage/' . $photo->store('rooms');
                    $newRoom->images()->create([
                        'uri' => $path
                    ]);
                }
            }
        }

        return redirect()->to(route('admin.rooms.index'))->with('success', 'A new room is successfully added.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        $room->load(['amenities','images','reservations']);
        return Inertia::render('Admin/RoomDetails', compact('room'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        $room->load(['images','amenities']);
        return Inertia::render('Admin/EditRoom',compact('room'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        if($request->hasFile('photo')){
            $photo = '/storage/' . $request->file('photo')->store('rooms');
            $room->image = $photo;
            $room->save();
        }

        $room->update($request->except(['id']));

        return redirect()->back()->with('success','Successfully saved changes!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        $room->delete();
        return redirect()->back()->with('success', 'Room was successfully deleted');
    }
}
