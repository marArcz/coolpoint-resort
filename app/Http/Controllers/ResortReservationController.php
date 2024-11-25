<?php

namespace App\Http\Controllers;

use App\Models\ExtraAmenity;
use App\Models\Reservation;
use App\Models\ReservationConfiguration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResortReservationController extends Controller
{
    public function __invoke(Request $request){
        $dateFrom = $request->query('dateFrom');
        $dateTo = $request->query('dateTo');
        $adults = $request->query('adults', 2);
        $children = $request->query('children', 0);
        $configuration = ReservationConfiguration::all()[0];
        $extraAmenities = ExtraAmenity::where('is_available', '=', true)->get();

        $reservations = Reservation::where('status', '=', 'Approved')->orderBy('date_from', 'asc')->get();

        return Inertia::render('Customer/CreateResortReservation', compact('dateFrom', 'dateTo', 'adults', 'children','configuration', 'reservations'));
    }
}
