<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Society extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'id_card_number',
        'born_date',
        'email',
        'gender',
        'address',
        'password',
        'login_tokens',
        'regional_id',
    ];

    protected $hidden = [
        'password', 'id'
    ];

    public function regional()
    {
        return $this->belongsTo(Regional::class);
    }
}
