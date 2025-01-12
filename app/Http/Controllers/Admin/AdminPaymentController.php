<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPaymentController extends Controller
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
    public function create(Reservation $reservation)
    {
        $reservation->load(['payments']);
        return Inertia::render('Admin/AddPayment', compact('reservation'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Reservation $reservation)
    {
        $payment_count = $reservation->payments()->count();
        $reservation->payments()->create([
            'amount' => $request->input('amount'),
            'method' => $request->input('method'),
            'status' => $request->input('status'),
            'type'=> $request->input('type'),
            'is_refundable'=> $request->input('is_refundable'),
            'payment_no' => 'P' .  $payment_count . $reservation->reservation_no
        ]);

        return redirect()->to(route('admin.reservations.show',$reservation->id))->with('Successfully added payment');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
