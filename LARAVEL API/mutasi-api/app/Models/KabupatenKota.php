<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KabupatenKota extends Model
{
    /** @use HasFactory<\Database\Factories\KabupatenKotaFactory> */
    use HasFactory;

    protected $fillable = [
        'nama',
        'provinsi_id'
    ];

    public function provinsi()
    {
        return $this->belongsTo(Provinsi::class);
    }

    public function kecamatans()
    {
        return $this->hasMany(Kecamatan::class);
    }
     
    
}
