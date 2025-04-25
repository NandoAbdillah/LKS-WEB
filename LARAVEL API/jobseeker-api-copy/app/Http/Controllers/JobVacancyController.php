<?php

namespace App\Http\Controllers;

use App\Models\JobVacancy;
use App\Http\Requests\StoreJobVacancyRequest;
use App\Http\Requests\UpdateJobVacancyRequest;
use Illuminate\Http\Request;

class JobVacancyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $jobCategoryId = $request->get('user')->validation->jobCategory->id;



        if (!$jobCategoryId) {
            return response()->json([
                'message' => 'You dont have any validations'
            ], 401);
        }

        $vancancies = JobVacancy::where('job_category_id', $jobCategoryId)->get();


        $response = $vancancies->map(function ($vacancy) {
            return [
                'id' => $vacancy->id,
                'category' => $vacancy->jobCategory,
                'company' => $vacancy->company,
                'address' => $vacancy->address,
                'description' => $vacancy->description,
                'available_position' => $vacancy->availablePositions()->get(['position', 'capacity', 'apply_capacity'])
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
    public function store(StoreJobVacancyRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $vacancy = JobVacancy::find($id);

        $availablePositions = $vacancy->availablePositions()->withCount(['jobApplies as apply_count'])
        ->get(['position', 'capacity', 'apply_capacity']);
        $availablePositions->makeHidden(['id', 'updated_at', 'created_at', 'job_vacancy_id']);

        return response()->json([
            'vacancy' => [
                'id' => $vacancy->id,
                'category' => $vacancy->jobCategory,
                'company' => $vacancy->company,
                'address' => $vacancy->address,
                'description' => $vacancy->description,
                'available_position' => $availablePositions
            ]
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
