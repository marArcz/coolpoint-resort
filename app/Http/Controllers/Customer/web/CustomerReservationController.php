<?php

namespace App\Http\Controllers\Customer\Web;

use App\Events\NewReservationCreated;
use App\Http\Controllers\Controller;
use App\Models\ExtraAmenity;
use App\Models\Reservation;
use App\Models\ReservationConfiguration;
use App\Models\Room;
use App\Models\User;
use App\Notifications\NewReservation;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Notification;
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
        $reservations = Reservation::with(['user', 'payment', 'cancellationRequest'])
            ->where('user_id', '=', $user->id)
            ->orderBy('id', 'desc')
            ->paginate(5);

        return Inertia::render('Customer/Reservations', compact('reservations'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $roomId = $request->query('room_id');
        $type = $request->query('type', 'room');
        $dateFrom = $request->query('date_from');
        $dateTo = $request->query('date_to');
        $adults = $request->query('adults', 2);
        $children = $request->query('children', 0);
        $configuration = ReservationConfiguration::all()[0];
        $extraAmenities = ExtraAmenity::where('is_available', '=', true)->get();
        $room = null;

        if (!($dateFrom && $dateTo)) {
            return redirect()->back();
        }

        if ($roomId) {
            $room = Room::find($roomId);
        }

        return Inertia::render('Customer/CreateReservation', compact('dateFrom', 'dateTo', 'adults', 'children', 'type', 'room', 'extraAmenities', 'configuration'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $type = $request->string('type', 'room');
        $reservation_no = Reservation::newReservationNo();
        $resortRate = 10000; // to be stored on db and be configured by admin
        $nights = Carbon::parse($request->date('date_from'))->diffInDays($request->date('date_to'));
        $total = 0;
        $addOns = $request->collect('add_ons');

        if ($type == 'room') {
            $room = Room::find($request->input('room_id'));
            $total = $room->price * $nights;
        } else {
            $total = $nights * $resortRate;
        }

        $newReservation = new Reservation([
            'adults' => $request->integer('adults'),
            'children' => $request->integer('children'),
            'payment_method' => $request->input('payment_method'),
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
        // save add ons
        $addOns->each(function ($addOn) use ($newReservation) {
            $newReservation->addOns()->create([
                'amenity' => $addOn['amenity']['name'],
                'quantity' => $addOn['quantity'] ?? 1,
                'price'  => $addOn['amenity']['price'],
                'amenity_id' => $addOn['amenity']['id']
            ]);
        });


        NewReservationCreated::dispatch($newReservation);

        return redirect()->to(route('reservations.show', [$newReservation->id]))->with('success', 'We successfully received your reservation. Kindly wait as we review your reservation. You will receive an email once your reservation is approved!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        $reservation->load(['addOns', 'cancellationRequest', 'room', 'payment', 'addOns']);

        $configuration = ReservationConfiguration::all()[0];
        return Inertia::render("Customer/ReservationDetails", compact('reservation', 'configuration'));
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
        return redirect()->to(route('reservations.index'))->with('success', 'Your reservation was successfully deleted!');
    }

    public function cancel(Request $request, Reservation $reservation)
    {
        $request->validate(['reason' => 'required']);

        $reservation->status = "Cancelled";
        $reservation->reason = $request->input('reason');
        $reservation->save();

        return redirect()->to(route('reservations.show',[$reservation->id]))->with("success", "Your reservation is successfully cancelled");
    }
}
