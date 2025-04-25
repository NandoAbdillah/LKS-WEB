<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AvailablePosition extends Model
{
    /** @use HasFactory<\Database\Factories\AvailablePositionFactory> */
    use HasFactory;


    protected $fillable = [
        'position',
        'capacity',
        'apply_capacity'
    ];


    public function jobApplies()
    {
        return $this->hasMany(JobApplyPosition::class, 'position_id', 'id');
    }
}
