<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spot extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'address',
        'regional_id',
        'serve',
        'capacity'
    ];

    public function vaccines()
    {
        return $this->belongsToMany(Vaccine::class, 'spot_vaccines');
    }

    public function regional()
    {
        return $this->belongsTo(Regional::class);
    }
}
