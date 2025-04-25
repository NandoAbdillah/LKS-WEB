<?php

namespace Database\Seeders;

use App\Models\JobVacancy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobVacancySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $vacancies = [
            [
                'job_category_id' => 1,
                'company' => 'IT Brain',
                'address' => 'Jl. Graha Kuncara no.12',
                'description' => 'IT Brain JOSS'
            ],
            [
                'job_category_id' => 1,
                'company' => 'Hexa Advance',
                'address' => 'Jl. Juanda no.15',
                'description' => 'Hexa JOSS'
            ],
            [
                'job_category_id' => 2,
                'company' => 'DX Construction',
                'address' => 'Jl. Krajan no.20',
                'description' => 'DX Construction JOSS'
            ]

        ];


        foreach ($vacancies as $vac) {
            JobVacancy::create($vac);
        }
    }
}
