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
        // Nueva migración: php artisan make:migration add_is_default_to_langs
        Schema::table('langs', function (Blueprint $table) {
            $table->boolean('is_default')->default(false)->after('visible');
        });

        // Asegúrate de que solo un idioma sea el predeterminado
        DB::statement('UPDATE langs SET is_default = false');
        DB::statement('UPDATE langs SET is_default = true WHERE id = (SELECT id FROM langs LIMIT 1)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('langs', function (Blueprint $table) {
            $table->dropColumn('is_default');
        });
    }
};
