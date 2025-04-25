<?php

namespace Database\Seeders;

use App\Models\PegawaiNegeriSipil;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermintaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pns1 = PegawaiNegeriSipil::where('nama', 'Nando Abdillah')->first();
        $pns2 = PegawaiNegeriSipil::where('nama', 'Aldi Firmansyah')->first();

        $peremintaans = [
            [
                'pns_id' => $pns1->id,
                'tipe' => 'perubahan_biodata',
                'data_perubahan' => json_encode([
                    'alamat' => 'Jl.Baru, Raden Patah'
                ]),
                'status' => 'pending'
            ],
            [
                'pns_id' => $pns2->id,
                'tipe' => 'mutasi',
                'data_perubahan' => json_encode([
                    'permintaan_mutasi' => 'Ingin dipindahkan ke kampus baru'
                ]),
                'status' => 'pending'
            ]
        ];
    }
}
