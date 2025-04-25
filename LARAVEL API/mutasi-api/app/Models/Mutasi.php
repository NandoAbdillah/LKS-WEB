<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mutasi extends Model
{
    /** @use HasFactory<\Database\Factories\MutasiFactory> */
    use HasFactory;

    protected $fillable = [
        'pns_id',
        'asal_desa_id',
        'tujuan_desa_id',
        'tanggal_mutasi',
        'jabatan_lama',
        'jabatan_baru',
        'instansi_asal',
        'instansi_tujuan',
        'keterangan'
    ];

    public function pns()
    {
        return $this->belongsTo(PegawaiNegeriSipil::class, 'pns_id');
    }

    public function asalDesa()
    {
        return $this->belongsTo(Desa::class, 'asal_desa_id');
    }

    public function tujuanDesa()
    {
        return $this->belongsTo(Desa::class, 'tujuan_desa_id');
    }

    public function asalDetail()
    {
        $desa =  $this->asalDesa;
        $kecamatan  = $desa ? $desa->kecamatan : null;
        $kabupatenKota = $kecamatan ? $kecamatan->kabupatenKota : null;
        $provinsi = $kabupatenKota ? $kabupatenKota->provinsi : null;

        return [
            'desa' => $desa,
            'kecamatan' => $kecamatan,
            'kabupatenKota' => $kabupatenKota,
            'provinsi' => $provinsi
        ];
    }

    public function tujuanDetail()
    {
        $desa = $this->tujuanDesa;
        $kecamatan = $desa ? $desa->kecamatan : null;
        $kabupatenKota = $kecamatan ? $kecamatan->kabupatenKota : null;
        $provinsi = $kabupatenKota ? $kabupatenKota->provinsi : null;

        return [
            'desa' => $desa,
            'kecamatan' => $kecamatan,
            'kabupatenKota' => $kabupatenKota,
            'provinsi' => $provinsi
        ];
    }
}
