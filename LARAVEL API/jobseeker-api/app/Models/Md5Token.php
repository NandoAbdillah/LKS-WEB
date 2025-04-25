<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Md5Token extends Model
{
    protected $table = 'personal_access_tokens';

    protected $fillable = [
        'tokenable_type',
        'tokenable_id',
        'name',
        'token',
        'abilities'
    ];

    public $timestamps = true;

    protected function tokenable()
    {
        return $this->morphTo();
    }

}
