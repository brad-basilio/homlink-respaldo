<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->string('title');
            $table->string('platform')->default('Airbnb'); // Airbnb, Booking, etc.
            $table->decimal('price_per_night', 8, 2);
            $table->string('currency', 3)->default('PEN');
            
            // Ubicación
            $table->string('address')->nullable();
            $table->string('district')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->default('Perú');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            
            // Características básicas
            $table->integer('bedrooms')->default(1);
            $table->integer('bathrooms')->default(1);
            $table->integer('max_guests')->default(2);
            $table->integer('area_m2')->nullable();
            
            // Descripción
            $table->text('description')->nullable();
            $table->text('short_description')->nullable();
            
            // Imágenes
            $table->string('main_image')->nullable();
            $table->json('gallery')->nullable(); // Array de imágenes
            
            // Amenidades y servicios (JSON)
            $table->json('amenities')->nullable(); // Wifi, Aire acondicionado, etc.
            $table->json('services')->nullable(); // Gimnasio, Área de juegos, etc.
            $table->json('characteristics')->nullable(); // Piscina, Jacuzzi, etc.
            
            // Información adicional
            $table->json('house_rules')->nullable();
            $table->json('check_in_info')->nullable();
            $table->decimal('rating', 2, 1)->default(5.0);
            $table->integer('reviews_count')->default(0);
            
            // Estado
            $table->boolean('active')->default(true);
            $table->boolean('featured')->default(false);
            $table->string('availability_status')->default('available'); // available, booked, maintenance
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('properties');
    }
};
