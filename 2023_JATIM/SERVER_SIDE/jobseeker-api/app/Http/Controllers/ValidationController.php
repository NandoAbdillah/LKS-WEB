<?php

namespace App\Http\Controllers;

use App\Http\Resources\ValidationResource;
use App\Models\Validation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreValidationRequest;
use App\Http\Requests\UpdateValidationRequest;

class ValidationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        // Mengambil data yang login
        $society = Auth::user();

        // Memanggil relasi hasOneSociety di modelnya
        $validation = $society->validation;

        if(!$validation)
        {
            return response()->json([
                'status' => 'not-found',
                'message' => 'Valdation not found for this  society'
            ], 404);
        }

        return new ValidationResource($validation);
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

        $societyId = Auth::user()->id;  
        if(Validation::where('society_id', $societyId)->exists())
        {
            return response()->json([
                'status' => 'alredy-exists',
                'message' => 'Society can only make one validation'
            ], 401);
        }
        $validation = $request->validate([
            'work_experience' => 'required',
            'job_category_id' => 'required|numeric',
            'job_position' => 'required',
            'reason_accepted' => 'required',
        ]);

        Validation::create(
            [
                'society_id' => $societyId,
                'work_experience' => $validation['work_experience'],
                'job_category_id' =>  $validation['job_category_id'],
                'job_position' => $validation['job_position'],
                'reason_accepted' => $validation['reason_accepted'],
            ]   
        );

        return response()->json([
            'message' => 'Request data validation sent successful'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Validation $validation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Validation $validation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateValidationRequest $request, Validation $validation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Validation $validation)
    {
        //
    }
}
