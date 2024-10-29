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
        Schema::create('user_formulas', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->longText('email');
            $table->char('has_treatment', 36)->nullable();
            $table->char('scalp_type', 36)->nullable();
            $table->char('hair_type', 36)->nullable();
            $table->json('hair_goals')->nullable();
            $table->string('fragrance')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->nullOnDelete();
            $table->foreign('has_treatment')->references('id')->on('formulas')->nullOnDelete();
            $table->foreign('scalp_type')->references('id')->on('formulas')->nullOnDelete();
            $table->foreign('hair_type')->references('id')->on('formulas')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_formulas');
    }
};
