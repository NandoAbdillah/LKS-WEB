<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Validation extends Model
{
    /** @use HasFactory<\Database\Factories\ValidationFactory> */
    use HasFactory;

    protected $fillable = [
        'job_category_id',
        'society_id',
        'validator_id',
        'status',
        'work_experience',
        'job_position',
        'reason_accepted',
        'validator_notes'
    ];

    public function validator()
    {
        return $this->belongsTo(Validator::class, 'validator_id', 'id');
    }

    public function jobCategory()
    {
        return $this->hasOne(JobCategory::class, 'id', 'job_category_id');
    }
}
