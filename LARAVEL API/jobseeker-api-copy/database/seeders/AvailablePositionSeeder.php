<?php

namespace Database\Seeders;

use App\Models\AvailablePosition;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AvailablePositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            [
                'job_vacancy_id' => 16,
                'position' => 'Web Programmer',
                'capacity' => 3,
                'apply_capacity' => 0
            ],
            [
                'job_vacancy_id' => 16,
                'position' => 'Mobile Programmer',
                'capacity' => 5,
                'apply_capacity' => 2
            ],

        ];

        foreach ($positions as $position) {
            AvailablePosition::create($position);
        }
    }
}
