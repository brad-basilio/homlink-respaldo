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
       

        Schema::create('infoproducts', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->string('name');
            $table->longText('summary')->nullable();
            $table->string('image')->nullable();
            $table->date('info_date')->nullable();
            $table->string('collaborator')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
            $table->uuid('category_id')->nullable();

            $table->foreign('category_id')->references('id')->on('infoproduct_categories')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('infoproducts');
    }
};
