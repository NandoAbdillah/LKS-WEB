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
        Schema::create('mutasis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pns_id')->constrained('pegawai_negeri_sipils')->onDelete('cascade');

            $table->foreignId('asal_desa_id')->constrained('desas')->onDelete('cascade');
            $table->foreignId('tujuan_desa_id')->constrained('desas')->onDelete('cascade');
            $table->date('tanggal_mutasi');
            $table->string('jabatan_lama')->nullable();
            $table->string('jabatan_baru')->nullable();
            $table->string('instansi_asal')->nullable();
            $table->string('instansi_tujuan')->nullable();
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mutasis');
    }
};
