<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Society extends Model
{
    /** @use HasFactory<\Database\Factories\SocietyFactory> */
    use HasFactory;
    protected $fillable = [
        'id_card_number',
        'password',
        'name',
        'born_date',
        'gender',
        'address',
        'regional_id',
        'login_tokens',
        'updated_at '
    ];

    public function regional()
    {
        return $this->hasOne(Regional::class, 'id', 'regional_id');
    }

    public function validation()
    {
        return $this->hasOne(Validation::class, 'society_id', 'id');
    }

    public function applications()
    {
        return $this->hasMany(JobApplySociety::class, 'society_id', 'id');
    }

    public function jobPositions()
    {
        return $this->hasMany(JobApplyPosition::class, 'society_id', 'id');
    }



    // public function jobCategory()
    // {
    //     $this->hasOneThrough(JobCategory::class, Validation::class, 'society_id', 'id', 'id', 'job_category_id');
    // }
}
