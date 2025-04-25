<?php

namespace Database\Seeders;

use App\Models\AvailablePosition;
use App\Models\JobVacancy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AvailablePositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {



        //  JobVacancy::create([
        //     'job_category_id' => 1,
        //     'company' => 'PT Lynx Techno',
        //     'address' => 'Jl. Ir.Soekarno no.17 Jakarta',
        //     'description' => 'IT Software for business'
        //  ]);
        //  JobVacancy::create([
        //     'job_category_id' => 3,
        //     'company' => 'CV Harimaw Malaya',
        //     'address' => 'Jl. Aing Maung no.50 Bandung',
        //     'description' => 'Cat Shop'
        //  ]);
        //  JobVacancy::create([
        //     'job_category_id' => 4,
        //     'company' => 'PT Gema Karya Abadi',
        //     'address' => 'Jl. Muhammad Rusdi no.06 Ngawi',
        //     'description' => 'Animation Studio'
        //  ]);
        //  ]);
        //  JobVacancy::create([
        //     'job_category_id' => 1,
        //     'company' => 'PT Neo Tech',
        //     'address' => 'Jl. Amba no.05 Ngawi',
        //     'description' => 'Robotics'
        //  ]);


        // AvailablePosition::create([
        //     'job_vacancy_id' => 16,
        //     'position' => 'Web Programmer',
        //     'capacity' => 10,
        //     'apply_capacity' => 3
        // ]);

        // AvailablePosition::create([
        //     'job_vacancy_id' => 16,
        //     'position' => 'Game Programmer',
        //     'capacity' => 17,
        //     'apply_capacity' => 5
        // ]);
        // AvailablePosition::create([
        //     'job_vacancy_id' => 17,
        //     'position' => 'Cashier',
        //     'capacity' => 2,
        //     'apply_capacity' => 0
        // ]);
        // AvailablePosition::create([
        //     'job_vacancy_id' => 18,
        //     'position' => 'Animator',
        //     'capacity' => 5,
        //     'apply_capacity' => 2
        // ]);
        // AvailablePosition::create([
        //     'job_vacancy_id' => 19,
        //     'position' => 'Robotic Programmer',
        //     'capacity' => 5,
        //     'apply_capacity' => 2
        // ]);
        AvailablePosition::create([
            'job_vacancy_id' => 19,
            'position' => 'Artificial Intelligence Programmer',
            'capacity' => 15,
            'apply_capacity' => 4
        ]);


    }
}
