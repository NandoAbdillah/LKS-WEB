<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AvailablePositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('available_positions')->insert([
            'id' => 1,
            'job_vacancy_id' => 1,
            'position' => 'Web Developer',
            'capacity'=> 10,
            'apply_capacity' => 3
        ]);
        DB::table('available_positions')->insert([
            'id' => 2,
            'job_vacancy_id' => 1,
            'position' => 'Android Developer',
            'capacity'=> 5,
            'apply_capacity' => 0
        ]);
    }
}
