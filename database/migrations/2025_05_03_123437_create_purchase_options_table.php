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
        Schema::create('purchase_options', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('link')->nullable();
            $table->boolean('status')->default(true);
            $table->boolean('visible')->default(true);
            $table->text('slug')->nullable();
            $table->json('characteristics')->nullable();
            $table->json('gallery')->nullable();
            $table->string('how_it_helps')->nullable();
            $table->text('description_helps')->nullable();
            $table->string('value_proposition')->nullable();
            $table->string('innovation_focus')->nullable();
            $table->text('customer_relation')->nullable();
            $table->json('benefits')->nullable();
            $table->string('image_secondary')->nullable();
            $table->string('image_banner')->nullable();
            $table->uuid('lang_id')->nullable()->after('id');
            $table->foreign('lang_id')->references('id')->on('langs')->onDelete('cascade');
            $table->string('how_it_requirements')->nullable();
            $table->text('description_requirements')->nullable();
            $table->json('requirements')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_options');
    }
};
