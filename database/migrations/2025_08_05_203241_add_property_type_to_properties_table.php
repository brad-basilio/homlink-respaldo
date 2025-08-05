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
        Schema::table('properties', function (Blueprint $table) {
            // Solo agregar property_type si no existe
            if (!Schema::hasColumn('properties', 'property_type')) {
                $table->string('property_type')->nullable()->after('platform');
            }
            
            // Solo agregar beds si no existe
            if (!Schema::hasColumn('properties', 'beds')) {
                $table->integer('beds')->nullable()->after('bedrooms');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropColumn(['property_type', 'beds']);
        });
    }
};
