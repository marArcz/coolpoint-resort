<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ApiRevenueController extends Controller
{
    public function __invoke(Request $request)
    {
        $reservations = Reservation::with(['payments'])
            ->doesntHave('cancellationRequest')
            ->has('payments')
            ->whereIn('status', ['Completed', 'No-Show'])
            ->get()
            ->filter(function ($reservation) {
                return $reservation->isPaid;
            });

        $revenue = 0;

        foreach ($reservations as $key => $reservation) {
            foreach($reservation->payments as $payment){
                $revenue += $payment->amount;
            }
        }
        $stats = [];

        for ($month = 1; $month <= 12; $month++) {
            $data['revenue'] = 0;
            $data['reservations'] = 0;
            $data['month'] = $month;
            $data['strMonth'] = Carbon::create()->month($month)->format('M');
            foreach ($reservations as $reservation) {
                $year = $request->query('year', \today()->year);
                $date = Carbon::parse($reservation->created_at);
                if ($date->year == $year && $date->month == $month) {
                    $data['revenue'] += $reservation->total;
                    $data['reservations'] += 1;
                }
            }

            $stats[] = $data;
        }

        return response()->json([
            'statistics' => $stats,
            'revenue' => $revenue
        ]);
    }
}
