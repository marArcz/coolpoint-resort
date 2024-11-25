<?php

namespace App\Notifications;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewReservation extends Notification implements ShouldBroadcastNow
{
    // use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(private Reservation $reservation)
    {
        $reservation->load(['user','room']);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {

        return (new MailMessage)
            ->line('Hello')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'reservation_id' => $this->reservation->id,
            'reservation_number' => $this->reservation->reservation_no,
            'reservation_type' => $this->reservation->type,
            'user_id' => $this->reservation->user_id,
            'title' => 'New reservation',
            'description' => $this->reservation->user->name . ' has booked ' . ($this->reservation->type == 'room'?$this->reservation->room->name:' the entire resort')
                . ' for ' . date('M d, Y',strtotime($this->reservation->date_from)) . ' - ' . date('M d, Y',strtotime($this->reservation->date_to)) . '.',
        ];
    }
    /**
     * Get the notification's database type.
     *
     * @return string
     */
    public function databaseType(object $notifiable): string
    {
        return 'new-reservation';
    }

    public function broadcastType(): string
    {
        return 'new-reservation';
    }

}
