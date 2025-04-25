<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        // //     'name' => 'Test User',
        // //     'email' => 'test@example.com',
        // // ]);
        // // id 	name 	email 	 	password 	make dummy data 3
        // DB::table('users')->insert([
        //     'name' => 'admin',
        //     'email' => 'admin@gmail.com',
        //     'password' => bcrypt('admin123'),
        // ]);
        // DB::table('users')->insert([
        //     'name' => 'user',
        //     'email' => 'user@gmail.com',
        //     'password' => bcrypt('user123'),
        // ]);

        // DB::table('medicals')->insert([
        //     'spot_id' => 1,
        //     'user_id' => 1,
        //     'role' => 'officer',
        //     'name' => 'admin',
        // ]);
        // DB::table('medicals')->insert([
        //     'spot_id' => 1,
        //     'user_id' => 2,
        //     'role' => 'doctor',
        //     'name' => 'user',
        // ]);
        //
        // Generate 10 dummy records
        for ($i = 1; $i <= 10; $i++) {
            DB::table('societies')->insert([
                'id_card_number' => $this->generateUniqueIDCardNumber(),
                'name' => "Society $i",
                'password' => bcrypt('password'), // Bcrypt the password
                'born_date' => $this->generateRandomDate(),
                'gender' => $this->generateRandomGender(),
                'address' => "Address $i",
                'login_tokens' => md5($this->generateUniqueIDCardNumber()), // MD5 from id_card_number
                'regional_id' => 1,
            ]);
        }

        // generate
    }
    private function generateUniqueIDCardNumber()
    {
        // make random
        $idcard = random_int(10000000, 99999999);
        return substr($idcard, 0, 8);
    }

    /**
     * Generate a random date of birth.
     *
     * @return string
     */
    private function generateRandomDate()
    {
        // You can implement your logic to generate a random date of birth here.
        // For simplicity, I'm using a basic example.
        return now()->subYears(random_int(18, 60))->toDateString();
    }

    /**
     * Generate a random gender.
     *
     * @return string
     */
    private function generateRandomGender()
    {
        $genders = ['male', 'female'];
        return $genders[array_rand($genders)];
    }
}
