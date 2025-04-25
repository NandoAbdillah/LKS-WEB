<?php

namespace Database\Seeders;

use App\Models\Desa;
use App\Models\PegawaiNegeriSipil;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MutasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pns1 = PegawaiNegeriSipil::where('nama', 'Nando Abdillah')->first();
        $pns2 = PegawaiNegeriSipil::where('nama', 'Aldi Firmansyah')->first();


        // Ambil desa
        $desaRadenPatah = Desa::where('nama', 'Raden Patah')->first();
        $desaAnuswara   = Desa::where('nama', 'Anuswara')->first();
        $desaJayakerta  = Desa::where('nama', 'Jayakarta')->first();
        $desaKemaro     = Desa::where('nama', 'Kemaro')->first();

        $mutasis = [
            [
                'pns_id' => $pns1->id,
                'asal_desa_id' => $desaRadenPatah->id,
                'tujuan_desa_id' => $desaAnuswara->id,
                'tanggal_mutasi' => Carbon::now()->subDays(30)->toDateString(),
                'jabatan_lama' => 'Guru',
                'jabatan_baru' => 'Guru SMK',
                'instansi_asal' => 'SMK 1 Negarakerta',
                'instansi_tujuan' => 'SMK 4 Diponegoro',
                'keterangan' => 'Mutasi untuk pengembangan karir'

            ],
            [
                'pns_id' => $pns2->id,
                'asal_desa_id' => $desaJayakerta->id,
                'tujuan_desa_id' => $desaKemaro->id,
                'tanggal_mutasi' => Carbon::now()->subDays(30)->toDateString(),
                'jabatan_lama' => 'Dosen',
                'jabatan_baru' =>'Dosen Senior',
                'instansi_asal' => 'Universitas Negeri Pallapa',
                'instansi_tujuan' => 'Universitas Negeri Palembang',
                'keterangan' => 'Mutasi karena peningkatan kualifikasi'
            ]
        ];
    }
}
