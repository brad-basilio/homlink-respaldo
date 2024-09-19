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
        Schema::create('agreements', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->char('request_id', 36)->index();
            $table->integer('contract_number');
            $table->integer('sessions');
            $table->string('process_type');
            $table->string('process_topic');
            $table->integer('session_duration');
            $table->string('session_frequency');
            $table->char('day', 1);
            $table->time('time');
            $table->string('location');
            $table->date('start_date');
            $table->string('payment_frequency');
            $table->decimal('total_amount', 10, 2);
            $table->integer('installments');
            $table->date('payment_start_date');
            $table->string('schedule_change_notice');
            $table->unsignedBigInteger('coach_id');
            $table->unsignedBigInteger('coachee_id');
            $table->boolean('status')->nullable();
            $table->timestamps();

            $table->foreign('request_id')->references('id')->on('requests')->cascadeOnDelete();
            $table->foreign('coach_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('coachee_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agreements');
    }
};
