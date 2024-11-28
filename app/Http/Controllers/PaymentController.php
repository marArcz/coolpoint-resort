<?php

namespace App\Http\Controllers;

use App\Events\PaymentIsUpdated;
use App\Events\ReservationUpdated;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\ReservationConfiguration;
use App\Models\User;
use App\Notifications\PaymentReceivedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
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
        $configuration = ReservationConfiguration::firstOrFail();
        return Inertia::render('Customer/CreatePayment', compact('reservation', 'configuration'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Reservation $reservation)
    {
        $request->validate([
            'method' => 'required',
            'amount' => 'required',
            'type' => 'required',
        ]);

        $amount = $request->integer('amount');
        $method = $request->string('method');
        $type = $request->string('type');
        $is_refundable = $request->boolean('is_refundable');

        // update payment method
        $reservation->save();

        // delete existing payments
        Payment::where('reservation_id', '=', $reservation->id)->delete();
        // proceed to payment creation
        $request->validate([
            'receipt' => 'required|file',
        ]);
        // create payment
        $receipt = $request->file("receipt")->store('payments');
        $payment = $reservation->payment()->create([
            'method' => $method,
            'type' => $type,
            'amount' => $amount,
            'payment_no' => "P" . $reservation->reservation_no,
            'status' => 'Completed',
            'receipt' => $receipt,
            'is_refundable' => $is_refundable,
        ]);

        // create notifications
        $admins = User::whereHasRole('admin')->get(); // get admins
        Notification::sendNow($admins, new PaymentReceivedNotification($payment));

        if ($method == 'gcash') {
            return redirect()->to(route('reservations.show', [$reservation->id]))->with('success', 'Thank you for your payment. Your transaction has been completed.');
        } else {
            return redirect()->to(route('reservations.show', [$reservation->id]))->with('success', 'Thank you. The remaining balance will be put on hold and will be processed on your arrival.');
        }
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
        $validated =  $request->validate([
            'method' => ['required'],
            'amount' => ['required'],
            'status' => ['required'],
            'notes' => ['nullable'],
            'receipt' => ['required'],
            'type' => ['required'],
            'is_refundable' => ['required'],
            'is_refunded' => ['required'],
        ]);

        $payment->update($validated);

        if ($request->hasFile('image')) {
            $payment->proof_of_refund = $request->file('image')->store('refunds');
        }

        $payment->save();

        // send notification
        $reservation = Reservation::find($payment->reservation_id);
        if ($reservation) {
            event(new ReservationUpdated($reservation));
        }

        if($payment->wasChanged('status')){
            event(new PaymentIsUpdated($payment));
        }

        return redirect()->back()->with('success', 'Successfully updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
