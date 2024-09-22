<?php

namespace App\Http\Controllers\Customer\Web;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class CustomerReservationController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {
        return [
            new Middleware('auth')
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $reservations = Reservation::where('status','!=','Cancelled')
            ->where('status','!=','Completed')
            ->where('user_id','=',$user->id)
            ->orderBy('id','desc')
            ->paginate(5);

        return Inertia::render('Customer/Reservations', compact('reservations'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Customer/CreateReservation');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $type = $request->input('type', 'room');
        $reservation_no = Reservation::newReservationNo();
        $resortRate = 10000; // to be stored on db and be configured by admin
        $nights = Carbon::parse($request->date('date_from'))->diffInDays($request->date('date_to'));
        $total = 0;

        if($type == 'room'){
            $room = Room::find($request->input('room_id'));
            $total = $room->price * $nights;
        }else{
            $total = $nights * $resortRate;
        }

        $newReservation = new Reservation([
            'adults' => $request->input('adults'),
            'children' => $request->input('children'),
            'total' => $total,
            'date_from' => $request->date('date_from'),
            'date_to' => $request->date('date_to'),
            'user_id' => $user->id,
            'reservation_no' => $reservation_no,
            'type' => $type
        ]);

        if ($type == 'room') {
            $newReservation['room_id'] = $request->integer('room_id');
        }

        $newReservation->save();

        return redirect()->to(route('reservations.confirm', [$newReservation->id]))->with('success', 'Successfully saved reservation');
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        return Inertia::render("Customer/ReservationDetails", compact('reservation'));
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
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return redirect()->to(route('reservations.index'))->with('success','Your reservation was successfully deleted!');
    }

    // confirm reservation
    public function confirm(Reservation $reservation)
    {
        return Inertia::render('Customer/ConfirmReservation', compact('reservation'));
    }
    // checkout reservation
    public function checkout(Request $request, Reservation $reservation)
    {
        $adults = $request->integer('adults');
        $children = $request->integer('children');
        $payment_method = $request->string('payment_method');
        $total = $request->integer('total');

        $reservation->adults = $adults;
        $reservation->children = $children;
        $reservation->payment_method = $payment_method;
        $reservation->status = "Confirmed";

        $reservation->save();

        // add payment
        if ($payment_method == 'cash') {
            $reservation->payment()->create([
                "method"=>"cash",
                "payment_no" => "P" . $reservation->reservation_no,
                "amount" => $total,
                'status'=>'On Hold'
            ]);
            return redirect(route('reservations.show',[$reservation->id]))->with('success','We are pleased to inform you that your reservation request has been received.');
        }else{
            return redirect(route('reservations.payment.create', [$reservation->id]));
        }
    }

    public function cancel(Request $request, Reservation $reservation)
    {
        $reservation->status = "Cancelled";
        $reservation->save();

        return redirect()->back()->with("success","Your reservation is successfully cancelled");
    }
}
