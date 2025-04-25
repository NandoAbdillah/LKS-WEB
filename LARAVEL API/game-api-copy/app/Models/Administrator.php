<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Administrator extends Model
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $fillable = [
        'username',
        'password'
    ];

    protected $table = 'administrators';

    protected function casts()
    {

        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed'
        ];
    }
}
