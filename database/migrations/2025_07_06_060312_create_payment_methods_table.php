<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->string('name')->nullable(); // Nombre del método de pago (BCP, Interbank, Yape, etc.)
            $table->string('slug')->nullable(); // Slug único para identificar
            $table->text('description')->nullable(); // Descripción opcional
            $table->string('image')->nullable(); // Imagen del logo del banco/método
            $table->enum('type', ['immediate_10min', 'immediate_24h']); // Tipo de transferencia
            $table->integer('order')->default(0); // Orden para mostrar
            $table->boolean('visible')->default(true); // Si está visible o no
            $table->boolean('status')->default(true); // Si está activo o no
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_methods');
    }
};
