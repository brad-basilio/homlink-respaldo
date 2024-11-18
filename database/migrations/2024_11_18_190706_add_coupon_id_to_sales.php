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
        Schema::table('sales', function (Blueprint $table) {
            $table->foreignUuid('bundle_id')->nullable()->constrained('bundles');
            $table->foreignUuid('renewal_id')->nullable()->constrained('renewals');
            $table->foreignUuid('coupon_id')->nullable()->constrained('coupons');
            $table->decimal('bundle_discount', 10, 2)->default(0);
            $table->decimal('renewal_discount', 10, 2)->default(0);
            $table->decimal('coupon_discount', 10, 2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropColumn(['bundle_id', 'renewal_id', 'coupon_id', 'bundle_discount', 'renewal_discount', 'coupon_discount']);
        });
    }
};
