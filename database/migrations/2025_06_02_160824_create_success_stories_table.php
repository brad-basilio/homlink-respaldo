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
        Schema::create('success_stories', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('summary')->nullable();
            $table->longText('description')->nullable();
            $table->string('image')->nullable();

            $table->string('title_benefits')->nullable();
            $table->longText('description_benefits')->nullable();
            $table->json('benefits')->nullable();

            
            $table->string('title_challenges')->nullable();
            $table->longText('description_challenges')->nullable();
            $table->json('challenges')->nullable();      
            $table->json('solutions')->nullable();
            $table->string('image_challenges')->nullable();


            
            $table->string('category_project')->nullable();
            $table->string('client_project')->nullable();

            $table->date('date_start_project')->nullable();
            $table->date('date_end_project')->nullable();
            $table->string('duration')->nullable(); 

            $table->json('services')->nullable();

            $table->string('company_name')->nullable();
            $table->string('company_logo')->nullable();
            $table->string('company_summary')->nullable();
            $table->string('company_percentage')->nullable();
            $table->string('company_description_percentage')->nullable();

            $table->boolean('visible')->default(true);
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('success_stories');
    }
};
