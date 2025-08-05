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
        Schema::create('property_metrics', function (Blueprint $table) {
            $table->id();
            $table->uuid('property_id');
            $table->string('event_type'); // 'view', 'click_airbnb', 'click_whatsapp', 'click_phone', 'share'
            $table->string('user_ip')->nullable();
            $table->string('user_agent')->nullable();
            $table->string('referrer')->nullable();
            $table->json('metadata')->nullable(); // Para datos adicionales específicos del evento
          $table->timestamps();
            
            $table->foreign('property_id')->references('id')->on('properties')->onDelete('cascade');
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_metrics');
    }
};
