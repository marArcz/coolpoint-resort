<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CancellationRequest;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCancellationRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $status = $request->query('status','Pending');
        $cancellationRequests = CancellationRequest::where('status','=',$status)->get();

        if($request->expectsJson()){
            return response()->json($cancellationRequests);
        }
        return Inertia::render('Admin/CancellationRequests',compact('cancellationRequests'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Reservation $reservation)
    {
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

    public function approve(Request $request, CancellationRequest $cancellationRequest)
    {
        $cancellationRequest->status = "Approved";
        if($cancellationRequest->save()){
            Reservation::where('id','=',$cancellationRequest->reservation_id)->update([
                'status' => 'Cancelled'
            ]);
            return redirect()->back()->with("success","Successfully approved cancellation request.");
        }
        return redirect()->back()->with("error","Sorry something went wrong please try again later");
    }
}
