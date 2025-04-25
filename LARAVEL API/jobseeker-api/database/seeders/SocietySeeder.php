<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SocietySeeder extends Seeder
{
    public function run()
    {

        DB::table('users')->insert([
            'id' => 1,
            'username' => 'user1',
            'password' => Hash::make('user123')
        ]);

        DB::table('validators')->insert([
            'id' => 1,
            'user_id' => 1,
            'role' => 'validator',
            'name' => 'validator123'
        ]);

        DB::table('societies')->insert([
            'id_card_number' => '12345678',
            'password' => Hash::make('password'),
            'name' => 'Test Society',
            'born_date' => '1990-01-01',
            'gender' => 'male',
            'address' => '123 Test Street',
            'regional_id' => 1,
            'login_tokens' => null,
        ]);

        // Tambahkan data dummy untuk relasi
        DB::table('validations')->insert([
            'society_id' => 1,
            'job_category_id' => 1,
            'validator_id' =>1,
            'status' => 'pending',
            'job_position' => 'Junior Programmer',
            'work_experience' => 'Study Tour'
        
        ]);

        DB::table('job_categories')->insert([
            'id' => 1,
            'job_category' => 'IT',
        ]);

        DB::table('job_vacancies')->insert([
            'id' => 1,
            'job_category_id' => 1,
            'company' => 'Test Company',
            'address' => 'Test Address',
            'description' => 'Test Job Description',
        ]);

    }
}
