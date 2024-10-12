<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservations = Reservation::all();
        return Inertia::render('Admin/Reservations',compact('reservations'));
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
    public function show(Reservation $reservation)
    {
        $reservation->load(['user']);
        return Inertia::render('Admin/ManageReservation', compact('reservation'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation)
    {
        $validated =  $request->validate([
            'date_from' => ['required'],
            'date_to' => ['required'],
            'adults' => ['required'],
            'children' => ['required'],
            'user_id' => ['required'],
            'status' => ['required'],
            'total' => ['required'],
            'reservation_no' => ['required'],
            'payment_method' => ['required'],
            'type' => ['required'],
        ]);

        $reservation->update($validated);
        $reservation->save();

        return redirect()->back()->with('success','Successfully updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        //
    }
}
