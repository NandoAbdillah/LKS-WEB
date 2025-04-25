<?php

namespace App\Http\Controllers;

use App\Models\JobVacancy;
use App\Http\Requests\StoreJobVacancyRequest;
use App\Http\Requests\UpdateJobVacancyRequest;
use Illuminate\Http\Request;;

class JobVacancyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $jobCategoryId = $request->get('user')->validation->job_category_id;

        $vacancies = JobVacancy::where('job_category_id', $jobCategoryId)->get();



        $res = $vacancies->map(function ($vac) {

            $positions = $vac->availablePositions()->get()->makeHidden([
                'id',
                'job_vacancy_id',
                'apply_capacity'
            ]);

            return [
                'id' => $vac->id,
                'category' => $vac->jobCategory,
                'company' => $vac->company,
                'address' => $vac->address,
                'description' => $vac->description,
                'available_position' => $positions
            ];
        });


        return response()->json([
            'vacancies' => $res
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
        // $validated = $request->validate([
        //     ''
        // ])
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $vacancy = JobVacancy::find($id);

        // return response()->json([
        //     'res' => $vacancy
        // ], 200);

        $positions = $vacancy->availablePositions()->withCount(['jobApplies as apply_count'])->get()->makeHidden([
        
            'job_vacancy_id',
            'apply_capacity'
        ]);;

        // return response()->json([
        //     'res' => $positions
        // ], 200);



        return response()->json([
            'vacancy' => [
                'id' => $vacancy->id,
                'category' => $vacancy->jobCategory,
                'company' => $vacancy->company,
                'address' => $vacancy->address,
                'description' => $vacancy->description,
                'available_position' => $positions
            ]
        ]);
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
