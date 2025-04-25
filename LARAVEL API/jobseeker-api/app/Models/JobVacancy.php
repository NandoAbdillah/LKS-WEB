<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobVacancy extends Model
{
    /** @use HasFactory<\Database\Factories\JobVacancyFactory> */
    use HasFactory;

    protected $fillable = [
        'company',
        'address',
        'description'
    ];

    public function jobCategory()
    {
       return $this->belongsTo(JobCategory::class, 'job_category_id', 'id');
    }
    
    public function availablePositions()
    {
      return  $this->hasMany(AvailablePosition::class, 'job_vacancy_id', 'id');
    }


    public function jobApplyPositions()
    {
      return $this->hasMany(JobApplyPosition::class);
    }
  
}
