<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use SebastianBergmann\CodeUnit\FunctionUnit;

class Game extends Model
{
    use HasFactory;


    protected $fillable = [
        'title',
        'slug',
        'description',
        'created_by'
    ];

    public function latestVersion()
    {
        return $this->hasOne(GameVersion::class, 'game_id')->latestOfMany();
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scores()
    {
        return $this->hasManyThrough(Score::class, GameVersion::class, 'game_id', 'game_version_id', 'id', 'id');
    }





    public function scoreForGame($gameId)
    {
        return $this->scores()
            ->whereHas('gameVersion', function ($query) use ($gameId) {
                $query->where('game_id', $gameId);
            })
            ->selectRaw('MAX(score) as highest_score, MAX(created_at) as latest_score_timestamp')
            ->groupBy('user_id');
    }


    public function versions()
    {
        return $this->hasMany(GameVersion::class, 'game_id');
    }

}
