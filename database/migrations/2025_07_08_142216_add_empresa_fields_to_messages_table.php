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
        Schema::table('messages', function (Blueprint $table) {
            $table->string('fullname')->nullable()->after('name');
            $table->string('lastname')->nullable()->after('fullname');

            $table->string('phone')->nullable()->after('email');
            $table->string('ruc')->nullable()->after('phone');
            $table->enum('contact_type', ['personal', 'empresa'])->default('personal')->after('ruc');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->dropColumn(['lastname', 'phone', 'ruc', 'contact_type']);
        });
    }
};
