<?php

namespace Database\Seeders;

use App\Models\KabupatenKota;
use App\Models\Provinsi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KabupatenKotaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prov1 = Provinsi::where('nama', 'Airlangga')->first();
        $prov2 = Provinsi::where('nama', 'Gajah Mada')->first();
        $prov3 = Provinsi::where('nama', 'Majapahit')->first();
        $prov4 = Provinsi::where('nama', 'Mataram')->first();
        $prov5 = Provinsi::where('nama', 'Sriwijaya')->first();



        $kabupatenKotas = [
            [
                'nama' => 'Negarakerta',
                'provinsi_id' => $prov1->id
            ],
            [
                'nama' => 'Pallapa',
                'provinsi_id' => $prov2->id
            ],
            [
                'nama' => 'Trowulan',
                'provinsi_id' => $prov3->id
            ],
            [
                'nama' => 'Sasak',
                'provinsi_id' => $prov4->id
            ],
            [
                'nama' => 'Palembang',
                'provinsi_id' => $prov5->id
            ]
        ];


        foreach($kabupatenKotas as $k) {
            KabupatenKota::create($k);
        }
    }
}
