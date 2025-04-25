<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Validator extends Model
{
    /** @use HasFactory<\Database\Factories\ValidatorFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'role',
        'name',
    ];
}
