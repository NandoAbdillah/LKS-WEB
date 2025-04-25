<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplySociety extends Model
{
    /** @use HasFactory<\Database\Factories\JobApplySocietyFactory> */
    use HasFactory;

    protected $fillable = [
        'notes',
        'date',
        'job_vacancy_id',
        'society_id'
    ];

    public function jobVacancy()
    {
      return $this->belongsTo(JobVacancy::class, 'job_vacancy_id', 'id');
    }
}
