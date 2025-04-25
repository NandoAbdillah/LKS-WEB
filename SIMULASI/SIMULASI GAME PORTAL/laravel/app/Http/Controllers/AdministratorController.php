<?php

namespace App\Http\Controllers;

use App\Models\Administrator;
use App\Http\Requests\StoreAdministratorRequest;
use App\Http\Requests\UpdateAdministratorRequest;

class AdministratorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = Administrator::all();

        $content = $admins->map(function ($admin) {

            return [
                'username' => $admin->username,
                'last_login_at' => $admin->last_login_at,
                'created_at' => $admin->created_at,
                'updated_at' => $admin->update_at
            ];
        });

        return response()->json([
            'totalElements' => count($admins),
            'content' => $content
        ], 200);
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
    public function store(StoreAdministratorRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Administrator $administrator)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Administrator $administrator)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdministratorRequest $request, Administrator $administrator)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Administrator $administrator)
    {
        //
    }
}
