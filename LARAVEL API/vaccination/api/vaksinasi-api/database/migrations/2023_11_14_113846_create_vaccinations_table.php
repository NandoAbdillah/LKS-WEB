<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vaccinations', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('dose');
            $table->date('date');
            $table->foreignId('society_id')->constrained('societies');
            $table->foreignId('spot_id')->constrained('spots');
            $table->foreignId('vaccine_id')->constrained('vaccines');
            $table->foreignId('doctor_id')->constrained('medicals');
            $table->foreignId('officer_id')->constrained('medicals');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vaccinations');
    }
};
