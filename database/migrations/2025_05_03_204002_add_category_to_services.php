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
            $table->uuid('category_service_id')->nullable();
            $table->foreign('category_service_id')->references('id')->on('category_services')->onDelete('cascade');
        });
        Schema::table('solutions', function (Blueprint $table) {
            $table->uuid('category_solution_id')->nullable();
            $table->foreign('category_solution_id')->references('id')->on('category_solutions')->onDelete('cascade');
        });
        Schema::table('purchase_options', function (Blueprint $table) {
            $table->uuid('category_purchase_option_id')->nullable();
            $table->foreign('category_purchase_option_id')->references('id')->on('category_purcharse_options')->onDelete('cascade');
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
