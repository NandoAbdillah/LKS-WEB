<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class PegawaiNegeriSipil extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\PegawaiNegeriSipilFactory> */
    use Notifiable, HasApiTokens, HasFactory;

    protected $fillable = [
        'nama',
        'tanggal_lahir',
        'tempat_lahir',
        'jabatan',
        'desa_id',
        'email',
        'telepon',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    public function desa()
    {
        return $this->belongsTo(Desa::class);
    }

    public function mutasis()
    {
        return $this->hasMany(Mutasi::class, 'pns_id');
    }

    public function permintaans()
    {
        return $this->hasMany(Permintaan::class, 'pns_id');
    }
}
