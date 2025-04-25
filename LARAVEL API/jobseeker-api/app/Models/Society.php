<?php

namespace App\Models;

use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Society extends Model
{
    /** @use HasFactory<\Database\Factories\SocietyFactory> */
    use HasFactory, HasApiTokens, Notifiable;

    protected $fillable = [

        'id_card_number',
        'password',
        'name',
        'born_date',
        'gender',
        'address',
        'regional_id'
    ];


    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }
    public function regional()
    {
        return $this->hasOne(Regional::class, 'id', 'regional_id');
    }

    public function validation()
    {
        return $this->hasOne(Validation::class)->with(['validator']);
    }

    public function jobVacancies()
    {
        return $this->hasManyThrough(
            JobVacancy::class,  // Tabel tujuan (job_vacancies)
            Validation::class,  // Tabel perantara (validations)
            'society_id',          // Foreign key di validations(menuju society.id) | Validation-> primary Society
            'job_category_id',  // Foreign key di job_vacancies (menuju validations.job_category_id)  |Kolom yang menghubungkan hubungan Job Vacancy dan Validation
            'id',               // Local key di users   | primary key tabel Asali
            'job_category_id'   // Local key di validations | penghubung dari tabel tujuan Vacancy
        );

        // Penjelasan sederhana
        //  First Key  kunci dari Tabel Perantara (kunci penghubung) ke Primary Tabel Utama
        // secondKey kunci dari Tabel Tujuan (kunci Penghubung) ke  Tabel Perantara
        // localKey kunci penerima firstKey di tabel Utama dari tabel Perantara
        // secondLocalKey kunci penerima secondkey ditabel perantara  dari tabel tujuan

    }

    public function jobApplications()
    {
        return $this->hasManyThrough(
            JobVacancy::class,
            JobApplySociety::class,
            'society_id',
            'id',
            'id',
            'job_vacancy_id'
        );
    }
}
