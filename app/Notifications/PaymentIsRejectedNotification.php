<?php

namespace App\Notifications;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentIsRejectedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(private Payment $payment)
    {
        $payment->load(['reservation']);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail','database','broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $reservation = $this->payment->reservation;
        return (new MailMessage)
                    ->line('Hello, ' . $reservation->user->name)
                    ->line('We are sad to inform you that your payment with the payment no. ' . $this->payment->payment_no . ' has been rejected!')
                    ->line('Please see the reason for rejecting your payment from below link:')
                    ->action('See Here', route('reservations.show',[$reservation->id]))
                    ->line('')
                    ->line('Thank you. We hope you\'ll enjoy your stay with us,!')
                    ->line('Cool Point Resort');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'payment_id' => $this->payment->id,
            'payment_no' => $this->payment->payment_no,
            'reservation_id' => $this->payment->reservation_id,
            'title' => 'Your payment has been rejected',
        ];
    }
}
