<?php

namespace App\Http\Controllers;

use App\Models\JobApplyPosition;
use App\Http\Requests\StoreJobApplyPositionRequest;
use App\Http\Requests\UpdateJobApplyPositionRequest;
use App\Models\AvailablePosition;
use App\Models\JobApplySociety;
use App\Models\Validation;
use Carbon\Carbon;
use Illuminate\Foundation\Exceptions\Handler;
use Illuminate\Http\Request;

// use function PHPSTORM_META\map;

class JobApplyPositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $society = $request->get('user');

        $applications =  $society->applications;




        $positions = $society->jobPositions()->get();

        $positionsRes = $positions->map(function ($pos) {
            return [
                'position' => $pos->position->position,
                'apply_status' => $pos->status,
                'notes' =>  $pos->applySociety->notes
            ];
        });


        $response = $applications->map(function ($application) use ($positionsRes) {
            return [
                'id' => $application->id,
                'category' => $application->jobVacancy->jobCategory,
                'company' => $application->jobVacancy->company,
                'address' => $application->jobVacancy->address,
                'position' => $positionsRes,
                'created_at' => $application->created_at
            ];
        });



        return response()->json([
            'vacancies' => $response
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

        $society = $request->get('user');



        $validation = $society->validation;

        if (!$validation || $validation->status !== 'accepted') {
            return response()->json([
                'message' => 'Your data validator must be accepted by validator before'
            ], 401);
        }

        $validated = $request->validate([
            'vacancy_id' => 'required|exists:job_vacancies,id',
            'positions' => 'required|array',
            'positions.*' => 'required|exists:available_positions,id',
            'notes' => 'required'
        ]);




        $positionIds = $validated['positions'];

        $positions = AvailablePosition::whereIn('id', $positionIds)->where('apply_capacity', '>', 0)
            ->get();

        $applications = $society->applications()->get();


        if (!$applications->isEmpty()) {
            $applicationIds = $applications->pluck('job_vacancy_id')->toArray();

            $status = in_array($request->vacancy_id, $applicationIds);

            if($status) {
                return response()->json([
                    'message' => 'Application for a job vacancy can only be once'
                ], 401);
            }
        }


        $unavailablePosition = array_diff($positionIds, $positions->pluck('id')->toArray());

        if (!empty($unavailablePosition)) {
            return response()->json([
                'message' => 'Some positions are unavailable'
            ], 400);
        }

        $jobApply = JobApplySociety::create([
            'society_id' => $society->id,
            'notes' => $request->notes,
            'job_vacancy_id' => $request->vacancy_id,
            'date' => Carbon::today()->toDateString()
        ]);


        foreach ($positions as $position) {
            JobApplyPosition::create([
                'date' => Carbon::today()->toDateString(),
                'society_id' => $society->id,
                'job_vacancy_id' => $validated['vacancy_id'],
                'position_id' => $position->id,
                'job_apply_societies_id' => $jobApply->id

            ]);

            $position->decrement('apply_capacity');
        }


        return response()->json([
            'message' => 'Applying for job successful'
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
