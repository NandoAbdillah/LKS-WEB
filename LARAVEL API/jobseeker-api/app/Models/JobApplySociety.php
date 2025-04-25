<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplySociety extends Model
{
    /** @use HasFactory<\Database\Factories\JobApplySocietyFactory> */
    use HasFactory;

    protected $fillable = [
        'society_id',
        'notes',
        'date',
        'job_vacancy_id'
    ];

    public function validation()
    {
        return $this->belongsTo(Validation::class);
    }

    public function jobApplyPositions()
    {
        return $this->hasMany(JobApplyPosition::class);
    }

    public function society()
    {
        return $this->belongsTo(Society::class);
    }
}
