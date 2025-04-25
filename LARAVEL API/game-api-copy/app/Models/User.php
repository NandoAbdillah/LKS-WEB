<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'last_login_at',
        'deleted_at',
        'delete_reason'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
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
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function scores()
    {
        return $this->hasMany(Score::class, 'user_id');
    }


    public function highScores()
    {
        return $this->scores()
            ->selectRaw('scores.game_version_id, MAX(scores.score) as score, MAX(scores.created_at) as timestamp')
            ->groupBy('scores.game_version_id')
            ->with(['gameVersion.game']);
    }

    public function scoreForGame($gameId)
    {
        return $this->scores()
            ->whereHas('gameVersion', function ($query) use ($gameId) {
                $query->where('game_id', $gameId);
            })
            ->selectRaw('scores.user_id, MAX(scores.score) as highest_score, MAX(created_at) as latest_score_timestamp')
            ->groupBy('scores.user_id');
    }

    public function authoredGames()
    {
        return $this->hasMany(Game::class, 'created_by')
            ->with('latestVersion')
            ->withSum('scores', 'score');
    }
}
