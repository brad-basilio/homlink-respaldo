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
        Schema::create('resources', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->string('name');
            $table->longText('description');
            $table->char('specialty_id', 36)->index()->nullable();
            $table->string('social_media');
            $table->string('media_id');
            $table->unsignedBigInteger('owner_id');
            $table->timestamps();

            $table->foreign('specialty_id')->references('id')->on('specialties')->nullOnDelete();
            $table->foreign('owner_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};
