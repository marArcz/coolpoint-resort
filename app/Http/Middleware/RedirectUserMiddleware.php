<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        if (Auth::guard($role)->check() && $request->user($role)->hasRole($role)) {
            return redirect($role == 'admin' ? route('admin.dashboard') : route('home'));
        }
        return $next($request);

        // return response("Bayad ka muna");
    }
}
