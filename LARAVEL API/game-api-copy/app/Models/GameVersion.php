<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PhpParser\Builder\Function_;
use PhpParser\Node\Expr\FuncCall;

class GameVersion extends Model
{
    use HasFactory;


    protected $fillable = [
        'game_id',
        'version',
        'storage_path',
        'thumbnail'
    ];


    public function game()
    {
        return $this->belongsTo(Game::class, 'game_id');
    }

    public function scores()
    {
        return $this->hasMany(Score::class, 'game_version_id');
    }

    protected function thumbnail()
    {

        return Attribute::make(
            get: fn($thumbnail) => url('/storage/thumbnails' . $thumbnail),
        );
    }

    // protected function 
}
