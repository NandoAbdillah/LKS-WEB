<?php

namespace App\Http\Controllers;

use App\Models\Validation;
use App\Http\Requests\StoreValidationRequest;
use App\Http\Requests\UpdateValidationRequest;
use Illuminate\Http\Request;

class ValidationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $society = $request->get('user');

        $validation = $society->validation;

        return response()->json([
            'validation' => [
                'id' => $validation->id,
                'status' => $validation->status,
                'work_experience' => $validation->work_experience,
                'job_category_id' => $validation->job_category_id,
                'job_category' => $validation->jobCategory->job_category,
                'job_position' => $validation->job_position,
                'reason_accepted' => $validation->reason_accepted,
                'validator' => $validation->validator
            ]
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $societyId = $request->get('user')->id;

        if (Validation::where('society_id', $societyId )->exists()) {
            return response()->json([
                'message' => 'Request Validation Data only once'
            ], 401);
        }


        $validated = $request->validate([
            'work_experience' => 'required|string',
            'job_category_id' => 'required|exists:job_categories,id',
            'job_position' => 'required|string',
            'reason_accepted' => 'required|string'
        ]);

        Validation::create([
            'society_id' => $societyId,
            'job_category_id' => $validated['job_category_id'],
            'work_experience' => $validated['work_experience'],
            'job_position' => $validated['job_position'],
            'reason_accepted' => $validated['reason_accepted']
        ]);


        return response()->json([
            "message" => "Request data validation sent successful"
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
