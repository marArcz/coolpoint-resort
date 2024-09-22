<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PaymentController extends Controller
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
        return Inertia::render('Customer/CreatePayment',compact('reservation'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Reservation $reservation)
    {
        $request->validate([
            'receipt' => 'required|file',
            'amount' => 'required'
        ]);

        $amount = $request->integer('amount');
        $receipt = $request->file("receipt")->store('payments');

        $reservation->payment()->create([
            'method'=>'gcash',
            'amount'=> $amount,
            'payment_no' => "P" . $reservation->reservation_no,
            'status' => 'Completed',
            'receipt' => $receipt
        ]);

        return redirect()->to(route('reservations.show',[$reservation->id]))->with('success','Thank you for your payment. Your transaction has been completed.');
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
