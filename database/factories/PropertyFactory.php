<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->randomElement([
            'Hermoso departamento en el centro',
            'Casa acogedora con vista al mar',
            'Apartamento moderno y cómodo',
            'Villa de lujo con piscina',
            'Loft industrial en distrito bohemio',
            'Casa familiar con jardín',
            'Estudio minimalista y elegante',
            'Penthouse con terraza privada'
        ]);

        return [
            'title' => $title,
            'slug' => \Str::slug($title . '-' . $this->faker->randomNumber(4)),
            'platform' => $this->faker->randomElement(['Airbnb', 'Booking.com', 'Vrbo', 'Homestay']),
            'price_per_night' => $this->faker->randomFloat(2, 50, 500),
            'currency' => $this->faker->randomElement(['USD', 'PEN', 'EUR']),
            'address' => $this->faker->streetAddress(),
            'department' => $this->faker->randomElement(['Lima', 'Cusco', 'Arequipa', 'Trujillo', 'Piura']),
            'province' => $this->faker->city(),
            'district' => $this->faker->randomElement(['Miraflores', 'San Isidro', 'Barranco', 'Surco', 'La Molina', 'Chorrillos']),
            'city' => $this->faker->city(),
            'country' => 'Perú',
            'latitude' => $this->faker->latitude(-18, -0.5),
            'longitude' => $this->faker->longitude(-81.5, -68.5),
            'bedrooms' => $this->faker->numberBetween(1, 5),
            'bathrooms' => $this->faker->numberBetween(1, 3),
            'max_guests' => $this->faker->numberBetween(2, 10),
            'area_m2' => $this->faker->numberBetween(30, 200),
            'description' => $this->faker->paragraphs(3, true),
            'short_description' => $this->faker->sentence(10),
            'main_image' => 'default-property.jpg',
            'gallery' => [
                'property-1.jpg',
                'property-2.jpg',
                'property-3.jpg',
                'property-4.jpg'
            ],
            'amenities' => [
                ['name' => 'WiFi gratuito', 'available' => true, 'icon' => 'fas fa-wifi'],
                ['name' => 'Aire acondicionado', 'available' => $this->faker->boolean(80), 'icon' => 'fas fa-snowflake'],
                ['name' => 'Cocina completa', 'available' => $this->faker->boolean(90), 'icon' => 'fas fa-utensils'],
                ['name' => 'TV con cable', 'available' => true, 'icon' => 'fas fa-tv'],
                ['name' => 'Estacionamiento', 'available' => $this->faker->boolean(60), 'icon' => 'fas fa-car']
            ],
            'services' => [
                ['name' => 'Limpieza diaria', 'available' => $this->faker->boolean(70), 'icon' => 'fas fa-broom'],
                ['name' => 'Servicio a cuarto', 'available' => $this->faker->boolean(50), 'icon' => 'fas fa-concierge-bell'],
                ['name' => 'Lavandería', 'available' => $this->faker->boolean(60), 'icon' => 'fas fa-tshirt']
            ],
            'characteristics' => [
                ['name' => 'Pet friendly', 'value' => $this->faker->boolean(40) ? 'Sí' : 'No', 'icon' => 'fas fa-paw'],
                ['name' => 'Acceso 24/7', 'value' => 'Sí', 'icon' => 'fas fa-clock'],
                ['name' => 'Seguridad', 'value' => 'Cámaras y vigilancia', 'icon' => 'fas fa-shield-alt']
            ],
            'house_rules' => [
                'No fumar en el interior',
                'No fiestas o eventos',
                'Check-in: después de las 3:00 PM',
                'Check-out: antes de las 11:00 AM',
                'Máximo de huéspedes permitidos: ' . $this->faker->numberBetween(2, 10)
            ],
            'check_in_info' => [
                'time' => '15:00',
                'method' => 'Recepción con anfitrión',
                'instructions' => 'Contactar por WhatsApp al llegar'
            ],
            'rating' => $this->faker->randomFloat(1, 3.5, 5.0),
            'reviews_count' => $this->faker->numberBetween(0, 150),
            'active' => true,
            'featured' => $this->faker->boolean(30),
            'availability_status' => 'available'
        ];
    }
}
