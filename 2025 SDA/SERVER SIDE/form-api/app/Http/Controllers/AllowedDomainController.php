<?php

namespace App\Http\Controllers;

use App\Models\AllowedDomain;
use App\Http\Requests\StoreAllowedDomainRequest;
use App\Http\Requests\UpdateAllowedDomainRequest;

class AllowedDomainController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAllowedDomainRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAllowedDomainRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AllowedDomain  $allowedDomain
     * @return \Illuminate\Http\Response
     */
    public function show(AllowedDomain $allowedDomain)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AllowedDomain  $allowedDomain
     * @return \Illuminate\Http\Response
     */
    public function edit(AllowedDomain $allowedDomain)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAllowedDomainRequest  $request
     * @param  \App\Models\AllowedDomain  $allowedDomain
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAllowedDomainRequest $request, AllowedDomain $allowedDomain)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AllowedDomain  $allowedDomain
     * @return \Illuminate\Http\Response
     */
    public function destroy(AllowedDomain $allowedDomain)
    {
        //
    }
}
