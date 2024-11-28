<?php

namespace App\Notifications;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentReceivedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Payment $payment)
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
        return ['database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
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
        $user = $this->payment->reservation->user;
        return [
            'title' => 'New Payment Received',
            'description' => $user->name . ' has paid ' . $this->payment->amount . ' as ' . $this->payment->type == 'downpayment' ? 'down payment' : 'full payment' . ' for reservation: ' . $this->payment->reservation->reservation_no,
            'payment_id' => $this->payment->id,
            'reservation_id' => $this->payment->reservation_id
        ];
    }

    /**
     * Get the notification's database type.
     *
     * @return string
     */
    public function databaseType(object $notifiable): string
    {
        return 'new-payment';
    }
    public function broadcastType()
    {
        return 'new-payment';
    }
}
