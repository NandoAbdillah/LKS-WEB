<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    /** @use HasFactory<\Database\Factories\GameFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'deleted_at',
        'created_by'
    ];


    public function author()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function versions()
    {
        return $this->hasMany(GameVersion::class, 'game_id');
    }


    // publuc function

    public function latestVersion()
    {
        return $this->hasOne(GameVersion::class, 'game_id')->latestOfMany();
    }

    public function scores()
    {
        return $this->hasManyThrough(
            Score::class,
            GameVersion::class,
            'game_id',
            'game_version_id',
            'id',
            'id'
        );
    }
}
