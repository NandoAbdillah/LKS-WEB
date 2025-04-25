<?php

namespace Database\Seeders;

use App\Models\KabupatenKota;
use App\Models\Kecamatan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KecamatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kab1 = KabupatenKota::where('nama', 'Negarakerta')->first();
        $kab2 = KabupatenKota::where('nama', 'Pallapa')->first();
        $kab3 = KabupatenKota::where('nama', 'Trowulan')->first();
        $kab4 = KabupatenKota::where('nama', 'Sasak')->first();
        $kab5 = KabupatenKota::where('nama', 'Palembang')->first();



        $kecamatans  = [
            [
                'nama' => 'Siliwangi',
                'kabupaten_kota_id' => $kab1->id
            ],
            [
                'nama' => 'Anoman',
                'kabupaten_kota_id' => $kab2->id
            ],
            [
                'nama' => 'Wengker',
                'kabupaten_kota_id' => $kab3->id
            ],
            [
                'nama' => 'Lombok',
                'kabupaten_kota_id' => $kab4->id
            ],
            [
                'nama' => 'Ilir Timur',
                'kabupaten_kota_id' => $kab5->id
            ]
        ];

        foreach($kecamatans as $kec) {
            Kecamatan::create($kec);
        }
    }
}
