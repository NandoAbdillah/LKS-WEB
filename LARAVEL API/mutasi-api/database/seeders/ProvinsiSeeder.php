<?php

namespace Database\Seeders;

use App\Models\Provinsi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProvinsiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $provinces = [
            ['nama' => 'Airlangga'],
            ['nama' => 'Gajah Mada'],
            ['nama' => 'Majapahit'],
            ['nama' => 'Mataram'],
            ['nama' => 'Sriwijaya']
        ];

        foreach($provinces as $prov) {
            Provinsi::create($prov);
        }
    }
}
