<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplyPosition extends Model
{
    /** @use HasFactory<\Database\Factories\JobApplyPositionFactory> */
    use HasFactory;

    protected $fillable = [
        'date',
        'society_id',
        'job_vacancy_id',
        'position_id',
        'job_apply_society_id',
        'status'
    ];

    // public function jobApplySocieties()
    // {
    //     return $this->belongsToMany(JobApplyPosition::class);
    // }

    public function jobApplySociety()
    {
        return $this->belongsTo(JobApplySociety::class);
    }

    public function position()
    {
        return $this->belongsTo (AvailablePosition::class , 'position_id', 'id');
    }
    
}
