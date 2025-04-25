<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Validation extends Model
{
    /** @use HasFactory<\Database\Factories\ValidationFactory> */
    use HasFactory;

    protected $fillable = [
        'validator_id',
        'job_category_id',
        'society_id',
        'status',
        'work_experience',
        'job_position',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function validator()
    {
        return $this->hasOne(Validator::class, 'id', 'validator_id');
    }

    public function jobCategory()
    {
        return $this->belongsTo(JobCategory::class);
    }

    public function jobVacancies()
    {
        return $this->hasMany(JobVacancy::class, 'job_category_id', 'job_category_id');
    }

    public function jobApplySocieties()
    {
        return $this->hasOne(JobApplySociety::class);
    }


}
