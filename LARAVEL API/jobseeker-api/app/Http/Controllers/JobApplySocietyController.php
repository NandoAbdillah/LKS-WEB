<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\JobApplySociety;
use App\Models\JobApplyPosition;
use App\Models\AvailablePosition;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreJobApplySocietyRequest;
use App\Http\Requests\UpdateJobApplySocietyRequest;
use App\Http\Resources\JobApplicationResource;
use App\Models\Society;

class JobApplySocietyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $society = Society::find($request->get('user')->id);

        $applications =$society->jobApplications()->with(['jobCategory', 'jobApplyPositions.position', 'jobApplyPositions.jobApplySociety'])->get();

        return JobApplicationResource::collection($applications);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $society = Society::with('validation')->find($request->get('user')->id);

        if(!$society || !$society->validation) {
            return response()->json([
                'message' => 'Your validation data is not available'
            ], 404);
        }

        if ($society->validation->status === 'pending') {
            return response()->json([
                'message' => 'Your data must be accepted by validator before',
            ], 401);
        } else if ($society->validation->status === 'declined') {
            return response()->json([
                'message' => 'Your data has been declined by validator'
            ], 401);
        }

        if (JobApplySociety::where('society_id',$society->id)->exists()) {
            return response()->json([
                'message' => 'Application can only be once'
            ], 401);
        }

        // Logika di frontend unuttuk menampilkan posisi yang tidak penuh atau sudah mencapai batas lamaran
        $validated = $request->validate([
            'vacancy_id' => 'required|numeric|exists:job_vacancies,id',
            'notes' => 'required|string|min:3',
            'positions' => 'required|array|min:1',
            'positions.*' => 'required|exists:available_positions,id'
        ]);

        $positionIds = $validated['positions'];

        $positions = AvailablePosition::whereIn('id', $positionIds)
            ->where('apply_capacity', '>', value: 0)
            ->get();



        $unavailablePosition = array_diff($positionIds, $positions->pluck('id')->toArray());

        if (!empty($unavailablePosition)) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Some position are unavailable',
                'unavailable_positions' => $unavailablePosition
            ], 400);
        }





        DB::beginTransaction();
        try {


            $jobApplySociety = JobApplySociety::create([
                'society_id' => $society->id,
                'notes' => $validated['notes'],
                'date' => Carbon::today()->toDateString(),
                'job_vacancy_id' => $validated['vacancy_id']
            ]);


            foreach ($positions as $position) {
                JobApplyPosition::create([
                    'date' =>   Carbon::today()->toDateString(),
                    'society_id' =>  $society->id,
                    'job_vacancy_id' => $validated['vacancy_id'],
                    'position_id' => $position->id,
                    'job_apply_society_id' => $jobApplySociety->id,
                ]);

                $position->decrement('apply_capacity');
            }

            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'Application submitted successfully'
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 400);
        }
    }


    public function nggawe(Request $request)
    {
        $society = $request->get('user')->with('validation');

        if(!$society || !$society->validation) {
            return response()->json([
                'message' => 'Your validataion data is not available'
            ], 404);
        }

        if($society->validation->status === 'pending') {
            return response()->json([
                'message' => 'Your data must be accepted by validator before'
            ], 401);
        } else if ($society->validation->status  === 'declined') {
            return  response()->json([
                'message' => 'Your data has been declined by validator'
            ], 401);
        }


        if(JobApplySociety::where('society_id', $society->id)->exists()) {
            return response()->json([
                'message' => 'Application can only be once'
            ], 401);
        }

        $request->validate([
            'vacancy_id' => 'required|numeric|exists:job_vacanies,id',
            'notes' => 'required|\
'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(JobApplySociety $jobApplySociety)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobApplySociety $jobApplySociety)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobApplySocietyRequest $request, JobApplySociety $jobApplySociety)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobApplySociety $jobApplySociety)
    {
        //
    }
}
