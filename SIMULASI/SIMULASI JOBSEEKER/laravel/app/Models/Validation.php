<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Validation extends Model
{
    /** @use HasFactory<\Database\Factories\ValidationFactory> */
    use HasFactory;

    protected $fillable = [
        'society_id',
        'job_category_id',
        'work_experience',
        'job_position',
        'reason_accepted',
        'validator_notes'
    ];


    public function validator()
    {
        return $this->belongsTo(Validator::class, 'validator_id');
    }

    public function jobCategory()
    {
        return $this->belongsTo(JobCategory::class, 'job_category_id');
    }
}
