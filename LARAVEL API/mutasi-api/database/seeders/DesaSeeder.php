<?php

namespace Database\Seeders;

use App\Models\Desa;
use App\Models\Kecamatan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DesaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kec1 = Kecamatan::where('nama', 'Siliwangi')->first();
        $kec2 = Kecamatan::where('nama', 'Anoman')->first();
        $kec3 = Kecamatan::where('nama', 'Wengker')->first();
        $kec4 = Kecamatan::where('nama', 'Lombok')->first();
        $kec5 = Kecamatan::where('nama', 'Ilir Timur')->first();

        $desas = [
            [
                'nama' => 'Raden Patah',
                'kecamatan_id' => $kec1->id
            ],
            [
                'nama' => 'Jayakarta',
                'kecamatan_id' => $kec2->id
            ],
            [
                'nama' => 'Anuswara',
                'kecamatan_id' => $kec3->id
            ],
            [
                'nama' => 'Selaparang',
                'kecamatan_id' => $kec4->id,
            ],
            [
                'nama' => 'Kemaro',
                'kecamatan_id' => $kec5->id
            ]
        ];

        foreach ($desas as $desa) {
            Desa::create($desa);
        }
    }
}
