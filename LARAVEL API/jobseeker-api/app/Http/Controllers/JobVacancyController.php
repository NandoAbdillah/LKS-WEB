<?php

namespace App\Http\Controllers;

use App\Models\JobVacancy;
use App\Http\Requests\StoreJobVacancyRequest;
use App\Http\Requests\UpdateJobVacancyRequest;
use App\Http\Resources\JobVacancyResource;
use App\Models\Society;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class JobVacancyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $societyId = $request->get('user')->id;
        $society = Society::find($societyId);
        $jobVacancy = $society->jobVacancies()->with(['jobCategory', 'availablePositions'])->get();


        return response()->json([
           'vacancies' => JobVacancyResource::collection($jobVacancy)
        ], 200);
    }

    // public function index()
    // {
    //     // $society = Auth::guard('society')->user()->id;

    //     // if (!$society) {
    //     //     return response()->json(['message' => 'Unauthorized'], 401);
    //     // }

    //     $auth = Auth::id();
    //     // Debug data pengguna
    //     return response()->json(['society' => $auth]);
    // }


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
    public function store(StoreJobVacancyRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

        $jobVacancy = JobVacancy::with(['jobCategory', 'availablePositions'])->find($id);

        if(!$jobVacancy) {
            return response()->json([
                'status' => 'not-found',
                'message' => 'Job Vacancy not found for this id'
            ]);
        }

        return response()->json([
            'vacancy' => new JobVacancyResource($jobVacancy)
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobVacancy $jobVacancy)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobVacancyRequest $request, JobVacancy $jobVacancy)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobVacancy $jobVacancy)
    {
        //
    }
}
