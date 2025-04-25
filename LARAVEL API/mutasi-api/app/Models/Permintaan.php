<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permintaan extends Model
{
    /** @use HasFactory<\Database\Factories\PermintaanFactory> */
    use HasFactory;
    
    protected $fillable = [
        'pns_id',
        'tipe',
        'data_perubahan',
        'status'
    ];

    public function pns()
    {
        return $this->belongsTo(PegawaiNegeriSipil::class, 'pns_id');
    }
}
