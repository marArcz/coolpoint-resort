<?php

namespace App\Http\Controllers\Admin;

use App\Events\ReservationStatusUpdated;
use App\Events\ReservationUpdated;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $year = $request->query('year','');
        $month = $request->query('month','');
        $type = $request->query('type','');
        $status = $request->query('status','');

        $years = Reservation::select(DB::raw('YEAR(date_from) as year'))
            ->groupBy(DB::raw('YEAR(date_from)'))->get()->map(fn($y) => $y->year);

        $reservations = Reservation::with(['user', 'cancellationRequest'])
            ->whereDateFrom($request)
            ->when($request->has('type'), fn($query) => $query->where('type',$request->query('type')))
            ->when($request->has('status'), fn($query) => $query->where('status',$request->query('status')))
            ->orderByDesc('id')
            ->paginate(10)->withQueryString();

        return Inertia::render('Admin/Reservations', compact('reservations', 'year', 'month', 'type', 'status', 'years'));
    }

    public function reservationsCalendar(Request $request)
    {
        $reservations = Reservation::with(['room'])->where('status', '!=', 'Cancelled')->get();
        return Inertia::render('Admin/ReservationsCalendar', compact('reservations'));
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
        $reservation->load(['user', 'cancellationRequest', 'room', 'payments', 'addOns']);
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
        $reservation->update($request->except('id'));

        if ($reservation->wasChanged('status')) {
            event(new ReservationUpdated($reservation));
        }

        return redirect()->back()->with('success', 'Successfully updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        //
    }
}
