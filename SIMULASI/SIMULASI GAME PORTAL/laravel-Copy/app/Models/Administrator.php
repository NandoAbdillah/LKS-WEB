<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Administrator extends Model
{
    /** @use HasFactory<\Database\Factories\AdministratorFactory> */
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'username',
        'password',
        'last_login_at',

    ];

    protected $hidden = [
        'password'
    ];
}
