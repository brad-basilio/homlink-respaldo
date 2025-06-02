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
        Schema::table('services', function (Blueprint $table) {
            $table->string('name')->nullable();

            $table->string('title_approach')->nullable();
            $table->text('description_approach')->nullable();
            $table->json('characteristics_approach')->nullable();

            $table->string('title_benefits')->nullable();

            $table->string('title_methodology')->nullable();
            $table->text('description_methodology')->nullable();
            $table->json('steps_methodology')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn([
                'name',
                'title_approach',
                'description_approach',
                'characteristics_approach',
                'title_benefits',
                'title_methodology',
                'description_methodology',
                'steps_methodology',
            ]);
        });
    }
};
