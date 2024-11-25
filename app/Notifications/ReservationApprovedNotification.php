<?php

namespace App\Notifications;

use App\Mail\ReservationStatusUpdatedMailable;
use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Mail\Mailable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReservationApprovedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Reservation $reservation)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        if($this->reservation->status == 'Approved')
        {
            return ['mail', 'database','broadcast'];
        }
        return ['database','broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): Mailable
    {
        return (new ReservationStatusUpdatedMailable($this->reservation))
                ->to($notifiable->email);
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
            'title' => 'Reservation update',
            'description' => 'Your reservation ' . $this->reservation->reservation_no . ' has been updated'
        ];
    }

    public function databaseType(object $notifiable): string
    {
        return 'reservation-update';
    }
    public function broadcastType(): string
    {
        return 'reservation-update';
    }
}
