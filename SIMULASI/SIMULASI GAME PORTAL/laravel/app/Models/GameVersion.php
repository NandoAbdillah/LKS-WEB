<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameVersion extends Model
{
    /** @use HasFactory<\Database\Factories\GameVersionFactory> */
    use HasFactory;

    protected $fillable = [
        'game_id',
        'version',
        'storage_path',
        'delete_at',
        'thumbnail'
    ];

    public function scores()
    {
        return $this->hasMany(Score::class, 'game_version_id');
    }

    public function game()
    {
        return $this->belongsTo(Game::class, 'game_id');
    }


    
}
