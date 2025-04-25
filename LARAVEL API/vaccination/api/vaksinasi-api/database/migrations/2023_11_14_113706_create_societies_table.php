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
        Schema::create('societies', function (Blueprint $table) {
            $table->id();
            $table->char('id_card_number', 8)->unique();
            $table->string('name', 255);
            $table->string('password', 255);
            $table->date('born_date');
            $table->enum('gender', ["male", "female"]);
            $table->text('address');
            $table->text('login_tokens');
            $table->foreignId('regional_id')->constrained('regionals');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('societies');
    }
};
