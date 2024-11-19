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
        Schema::create('coupons', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->enum('type', ['percentage', 'fixed_amount'])->default('percentage');
            $table->decimal('/* The `amount` column in the `coupons` table is a decimal field with a
            precision of 10 digits and a scale of 2. This means that it can store a
            numeric value with up to 10 total digits, with 2 digits after the
            decimal point. It is likely used to store the value of the coupon,
            whether it is a fixed amount or a percentage discount. */
            amount', 10, 2);
            $table->decimal('sale_amount', 10, 2);
            $table->integer('stock');
            $table->date('date_begin')->nullable();
            $table->date('date_end')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
