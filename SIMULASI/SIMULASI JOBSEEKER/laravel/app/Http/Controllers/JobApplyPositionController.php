<?php

namespace App\Http\Controllers;

use App\Models\JobApplyPosition;
use App\Http\Requests\StoreJobApplyPositionRequest;
use App\Http\Requests\UpdateJobApplyPositionRequest;
use App\Models\AvailablePosition;
use App\Models\JobApplySociety;
use Carbon\Carbon;
use Illuminate\Foundation\Exceptions\Handler;
use Illuminate\Http\Request;

class JobApplyPositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $society = $request->get('user');

        $applications = $society->applications()->get();

        // return response()->json([
        //     'rs' => $applications
        // ], 200);


        $res = $applications->map(function ($app) {

            $positions = $app->applyPositions()->get()->map(function ($pos) use ($app) {
                return [
                    'position' => $pos->position->position,
                    'apply_status' =>  $pos->status,
                    'notes' => $app->notes
                ];
            });

            return [
                'id' => $app->id,
                'category' => $app->jobVacancy->jobCategory,
                'company' => $app->jobVacancy->company,
                'address' => $app->jobVacancy->address,
                'position' => $positions,
                'created_at' => $app->created_at
            ];
        });


        return response()->json([
            'vacancies' => $res
        ], 200);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $society = $request->get('user');

        $validation = $society->validation;

        if (!$validation || empty($validation)) {
            return response()->json([
                'message' => "You didn't have any validation"
            ], 401);
        }

        if ($validation->status !== 'accepted') {
            return response()->json([
                'message' => 'Your data validation must be accepted by validator before'
            ], 401);
        }

        $validated = $request->validate([
            'vacancy_id' => 'required|exists:job_vacancies,id',
            'positions' => 'required|array',
            'positions.*' => 'required|exists:available_positions,id',
            'notes' => 'required|string'
        ]);


        $availablePosition = AvailablePosition::where('apply_capacity', '>', 0)->get()->pluck('id')->toArray();

        $unavailablePosition = array_diff($validated['positions'], $availablePosition);

        if (!(empty($unavailablePosition))) {
            return response()->json([
                'message' => 'Some position are unavailable'
            ], 401);
        }

        $haveApplyPosition = JobApplyPosition::where('society_id', $society->id)
            ->whereIn('position_id', $validated['positions'])
            ->exists();

        if (!(empty($haveApplyPosition))) {
            return response()->json([
                'message' => 'You cannot apply same position twice'
            ], 401);
        }


        $jobApply = JobApplySociety::create([
            'society_id' => $society->id,
            'date' => Carbon::today()->toDateString(),
            'job_vacancy_id' => $validated['vacancy_id']
        ]);

        foreach ($validated['positions'] as $pos) {
            JobApplyPosition::create([
                'date' => Carbon::today()->toDateString(),
                'society_id' => $society->id,
                'job_vacancy_id' => $validated['vacancy_id'],
                'position_id' => $pos,
                'job_apply_societies_id' => $jobApply->id,
            ]);
        }

        return response()->json([
            'message' => 'Applying for a job successfull'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(JobApplyPosition $jobApplyPosition)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobApplyPosition $jobApplyPosition)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobApplyPositionRequest $request, JobApplyPosition $jobApplyPosition)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobApplyPosition $jobApplyPosition)
    {
        //
    }
}
