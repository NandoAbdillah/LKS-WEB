<?php

namespace App\Http\Controllers;

use App\Models\Validation;
use App\Http\Requests\StoreValidationRequest;
use App\Http\Requests\UpdateValidationRequest;
use Illuminate\Http\Request;

use function PHPSTORM_META\map;

class ValidationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
         $validation = $request->get('user')->validation;

        //  if(!$validation) {
        //     return response()->json([
        //         'message' => 'Society doesnt have any validations'
        //     ], 401);
        //  }

         return response()->json([
            'validation' => [
                'id' => $validation->id,
                'status' => $validation->status,
                'work_experience' => $validation->work_exprience,
                'job_category_id' => $validation->job_category_id,
                'job_position' => $validation->job_position,
                'reason_accepted' => $validation->reason_accepted,
                'validator_notes' => $validation->validator_notes,
                'validator' => $validation->validator
            ]
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
    public function store(Request $request)
    {
        $request->validate([
            'work_experience' => 'required',
            'job_category_id' => 'required|exists:job_categories,id',
            'job_position' => 'required',
            'reason_accepted' => 'required'
        ]);

        $society = $request->get('user');

        $validation = Validation::where('society_id', $society->id)->first();

        if ($validation) {
            return response()->json([
                'message' => 'Validation data only be once'
            ], 200);
        }

        Validation::create([
            'job_category_id' => $request->job_category_id,
            'society_id' => $society->id,
            'work_experience' => $request->work_experience,
            'job_position' => $request->job_position,
            'reason_accepted' => $request->reason_accepted
        ]);

        return response()->json([
            'message' => 'Request data vallidation sent successful'
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
