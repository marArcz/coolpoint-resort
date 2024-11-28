<?php

namespace App\Console\Commands;

use App\Models\Reservation;
use Illuminate\Console\Command;

class UpdateReservationStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reservation:check';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Looks for reservations that needs its status to be updated.';
    /**
     * Execute the console command.
     */
    public function handle()
    {

        // reservations scheduled today
        Reservation::where('date_from','=','CURRENT_DATE()')
                ->where('status','=','Approved')
                ->update([
                    'status' => 'On-Going'
                ]);

        // reservations ends today
        Reservation::where('date_to','=','CURRENT_DATE() + 1')
                ->where('status','=','On-Going')
                ->update([
                    'status' => 'Completed'
                ]);
    }
}
