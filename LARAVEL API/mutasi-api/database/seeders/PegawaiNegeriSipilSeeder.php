<?php

namespace Database\Seeders;

use App\Models\Desa;
use App\Models\PegawaiNegeriSipil;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PegawaiNegeriSipilSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $des1 = Desa::where('nama', 'Raden Patah')->first();
        $des2 = Desa::where('nama', 'Jayakarta')->first();

        $pnss = [
            [
                'nama' => 'Nando Abdillah',
                'tanggal_lahir' => '1980-05-10',
                'tempat_lahir' => 'Negarakerta',
                'jabatan' => 'Guru',
                'desa_id' => $des1->id,
                'email' => 'nando@email.com',
                'telepon' => '0812345678',
                'password' => Hash::make('nando123')
            ],
            [
                'nama' => 'Aldi Firmansyah',
                'tanggal_lahir' => '1990-06-10',
                'tempat_lahir' => 'Pallapa',
                'jabatan' => 'Dosen',
                'desa_id' => $des2->id,
                'email' => 'aldi@email.com',
                'telepon' => '0812345678',
                'password' => Hash::make('aldi123')

            ]

        ];


        foreach ($pnss as $p) {
            PegawaiNegeriSipil::create($p);
        }
    }
}
