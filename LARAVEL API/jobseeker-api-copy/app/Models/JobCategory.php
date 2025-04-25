<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobCategory extends Model
{
    /** @use HasFactory<\Database\Factories\JobCategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'job_category'
    ];
}
