<?php

namespace App\Http\Controllers;

use App\Models\ExtraAmenity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExtraAmenityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $extraAmenities = ExtraAmenity::paginate(10);

        return Inertia::render('Admin/ExtraAmenities', compact('extraAmenities'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AddExtraAmenity');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'string|required',
            'price' => 'required|numeric',
        ]);
        $amenity = new ExtraAmenity($request->only(['name', 'price']));
        $amenity->saveOrFail();

        return redirect()->to(route('admin.extra_amenities.index'))->with('success', 'Successfully added new amenity');
    }

    /**
     * Display the specified resource.
     */
    public function show(ExtraAmenity $extraAmenity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExtraAmenity $extraAmenity)
    {
        return Inertia::render('Admin/EditExtraAmenity', compact('extraAmenity'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExtraAmenity $extraAmenity)
    {
        $request->validate([
            'name' => 'string|required',
            'price' => 'required|numeric',
        ]);
        $extraAmenity->updateOrFail($request->only(['name','price']));
        return redirect()->to(route('admin.extra_amenities.index'))->with('success', 'Successfully updated amenity');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExtraAmenity $extraAmenity)
    {
        $extraAmenity->delete();
        return redirect()->to(route('admin.extra_amenities.index'))->with('success', 'Successfully deleted amenity');
    }
}
