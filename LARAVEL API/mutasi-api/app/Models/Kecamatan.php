<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kecamatan extends Model
{
    /** @use HasFactory<\Database\Factories\KecamatanFactory> */
    use HasFactory;

    protected $fillable = [
        'nama',
        'kabupaten_kota_id'
    ];

    public function kabupatenKota()
    {
        return $this->belongsTo(KabupatenKota::class);
    }

    public function desas()
    {
        return $this->hasMany(Desa::class);
    }
}
