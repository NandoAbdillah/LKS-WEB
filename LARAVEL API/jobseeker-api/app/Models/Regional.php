<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regional extends Model
{
    /** @use HasFactory<\Database\Factories\RegionalFactory> */
    use HasFactory;

    protected $fillable = [
        'province',
        'disctrict',
    ];



    // public function user()
    // {
    //     return $this->belongsTo(Society::class);
    // }
}
