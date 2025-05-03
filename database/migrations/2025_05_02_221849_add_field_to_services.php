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
            $table->string('how_it_helps')->nullable();
            $table->text('description_helps')->nullable();
            $table->string('value_proposition')->nullable();
            $table->string('innovation_focus')->nullable();
            $table->text('customer_relation')->nullable();
            $table->json('benefits')->nullable();
            $table->string('image_secondary')->nullable();
            $table->string('image_banner')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            //
        });
    }
};
