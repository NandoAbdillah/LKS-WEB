<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'password',
        'last_login_at',
        'delete_at',
        'delete_reason'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function authoredGames()
    {
        return $this->hasMany(Game::class, 'created_by', 'id');
    }

    public function scores()
    {
        return $this->hasMany(Score::class, 'user_id')->orderBy();
    }



    // public function highestScore()
    // {
    //     return $this->hasMany(Score::class, 'user_id')->orderBy('score', 'desc');
    // }


    public function highestScorePerGame()
    {
        return $this->hasMany(Score::class, 'user_id')
            ->select('user_id', 'game_version_id', DB::raw('MAX(score) as score'))
            ->groupBy('game_version_id', 'user_id');
    }
}
