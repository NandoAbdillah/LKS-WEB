<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    protected $fillable =
    [
        'game_version_id',
        'score',
        'user_id',
        'created_at'
    ];


    public function gameVersion()
    {
        return $this->belongsTo(GameVersion::class, 'game_version_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
