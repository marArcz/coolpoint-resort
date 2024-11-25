<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\RoomImage;
use Illuminate\Http\Request;

class AdminRoomImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Room $room, Request $request)
    {
        $request->validate([
            'photo' => ['file','required']
        ]);

        $uri = '/storage/' . $request->file('photo')->store('rooms');

        $room->images()->create([
            'uri' => $uri
        ]);

        return redirect()->back()->with('success','Successfully added photo!');
    }

    /**
     * Display the specified resource.
     */
    public function show(RoomImage $roomImage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RoomImage $roomImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RoomImage $roomImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RoomImage $roomImage)
    {
        $roomImage->delete();
        return redirect()->back()->with('success','Successfully deleted photo!');
    }
}
