<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ApiReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $month = $request->query('month', '');
        $type = $request->query('type', '');
        $status = $request->query('status', '');

        $reservations = Reservation::with(['user'])
            ->whereMonth('date_from', $month == '' ? '!=' : '=', $month)
            ->where('type', $type == '' ? '!=' : '=', $type)
            ->where('status', $status == '' ? '!=' : '=', $status)
            ->orderBy('date_from')
            ->get();
        return response()->json($reservations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        $reservation->load(['room','payments','user','addOns','cancellationRequest']);
        return response()->json($reservation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        //
    }
}
