<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $notifications = $user->unreadNotifications;

        if ($request->expectsJson()) {
            return response()->json($notifications);
        }
        return Inertia::render('Customer/Notifications', compact('notifications'));
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
    public function show(string $id, Request $request)
    {
        $user = $request->user();
        $notification = $user->notifications->findOrFail($id);
        $data = $notification->data;

        if ($notification->type == 'reservation-update') {
            $notification->markAsRead();
            return redirect()->to(route('reservations.show', [$data['reservation_id']]));
        } else if ($notification->type == 'new-cancellation-request') {
            $notification->markAsRead();
            return redirect()->to(route('admin.reservations.show', [$data['reservation_id']]));
        }
        return redirect()->back()->with('error', 'Uh oh something seems wrong with that');
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
    public function destroy(string $id)
    {
        //
    }
    public function readAll(Request $request)
    {
        $user = $request->user();
        $user->unreadNotifications->markAsRead();
        return redirect()->back()->with('success','Successfully marked all notification as read');
    }
}
