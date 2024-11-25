<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Room;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AvailabilityController extends Controller
{
    public function search(Request $request)
    {

    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $dateFrom = $request->date('date_from');
        $dateTo = $request->date('date_to');
        $adults = $request->integer('adults');
        $children = $request->integer('children');
        $totalSize = $adults + $children;

        $isResortAvailable = !Reservation::haveReservations($dateFrom,$dateTo);

        // fetch available rooms
        $rooms = Room::where('max_people', '>=', $totalSize / 2)
            ->whereNotIn('id',Reservation::scheduledWithin($dateFrom,$dateTo)->select('room_id'))->paginate(10);
        // dd($rooms);
        return Inertia::render('Customer/SearchAvailability', compact('rooms', 'dateFrom', 'dateTo', 'adults', 'children', 'isResortAvailable'));
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
    public function show(string $id)
    {
        //
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
