<?php

namespace App\Http\Controllers;

use App\Models\CancellationRequest;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CancellationRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Reservation $reservation)
    {
        $reservation->load(['payment']);
        return Inertia::render("Customer/CreateCancellationRequest",compact('reservation'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Reservation $reservation)
    {
        $request->validate([
            'reason' => 'required'
        ]);

        CancellationRequest::where('reservation_id','=',$reservation->id)->delete();

        $cancellationRequest = new CancellationRequest();
        $cancellationRequest->gcash_account_name = $request->input('gcash_account_name','');
        $cancellationRequest->gcash_number = $request->input('gcash_number','');
        $cancellationRequest->reason = $request->input('reason','');

        $reservation->cancellationRequest()->save($cancellationRequest);
        return redirect()->to(route('reservations.show',[$reservation->id]))->with('success','You successfully submitted your request for cancellation of this reservation.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CancellationRequest $cancellationRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CancellationRequest $cancellationRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CancellationRequest $cancellationRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CancellationRequest $cancellationRequest)
    {
        $cancellationRequest->delete();
        return redirect()->back()->with("success","Great. We successfully removed the cancellation request!");
    }

}
