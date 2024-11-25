<x-mail::message>
# Hello {{$reservation->user->name}},

@if ($reservation->status == 'Approved')
We are pleased to inform you that your reservation has been <strong>APPROVED</strong>!

<strong><small class="text-warning">Note: Automatic cancellation will be done if no payment is made before the schedule.</small></strong>
@else
Your reservation has been <strong>{{strtoupper($reservation->status)}}</strong>!
@endif

<x-mail::panel>
Reservation No: {{$reservation->reservation_no}}

Reservation Type: {{($reservation->type == 'room' ?'Room ':'Resort ') . 'reservation' }}

Schedule: {{date('M d, Y',strtotime($reservation->date_from))}} - {{date('M d, Y',strtotime($reservation->date_to))}}
</x-mail::panel>

# Next Step

You will need to process your payment for this reservation from our website, please follow the instructions according to your chosen payment method.

<x-mail::button :url="$url">
Open Reservation
</x-mail::button>

Thank you. We hope you'll enjoy your stay with us,<br>
{{ config('app.name') }}
</x-mail::message>
