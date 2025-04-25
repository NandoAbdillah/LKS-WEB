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
        'address',
        'gender',
        'login_tokens',
        'regional_id'
    ];

    public function regional()
    {
        return $this->belongsTo(Regional::class, 'regional_id');
    }

    public function validation()
    {
        return $this->hasOne(Validation::class, 'society_id');
    }

    public function applications()
    {
        return $this->hasMany(JobApplySociety::class, 'society_id');
    }
}
