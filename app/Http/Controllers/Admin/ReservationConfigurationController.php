<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReservationConfiguration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationConfigurationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservationConfiguration = ReservationConfiguration::firstOrFail();
        return Inertia::render('Admin/ReservationConfiguration', compact('reservationConfiguration'));
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
    public function show(ReservationConfiguration $reservationConfiguration)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ReservationConfiguration $reservationConfiguration)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ReservationConfiguration $reservationConfiguration)
    {
        if ($request->hasFile('gcash_qr_code')) {
            $image = '/storage/' . $request->file('gcash_qr_code')->store('settings');
            $reservationConfiguration->gcash_qr_code = $image;
            $reservationConfiguration->save();
        }

        $reservationConfiguration->updateOrFail($request->except(['id', 'gcash_qr_code']));
        return redirect()->back()->with('success', 'Successfully saved changes');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ReservationConfiguration $reservationConfiguration)
    {
        //
    }
}
