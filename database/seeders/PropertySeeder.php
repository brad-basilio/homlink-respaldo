<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Property;
use Illuminate\Support\Str;

class PropertySeeder extends Seeder
{
    public function run()
    {
        $properties = [
            [
                'title' => 'Apartamento moderno en Miraflores',
                'slug' => 'apartamento-moderno-miraflores',
                'platform' => 'Airbnb',
                'price_per_night' => 120.00,
                'currency' => 'PEN',
                'address' => 'Av. Ricardo Palma 251',
                'district' => 'Miraflores',
                'city' => 'Lima',
                'country' => 'Perú',
                'bedrooms' => 1,
                'bathrooms' => 1,
                'max_guests' => 2,
                'area_m2' => 60,
                'description' => 'Apartamento ubicado estratégicamente en Playa Grande, Brasil. Excelente infraestructura a metros del mar. Apartamentos de 1 y 2 dormitorios y torres de 24 y 32 pisos con 4 apartamentos por planta. Cada apartamento cuenta con cocina americana, baño completo, dormitorio para dos personas y balcón con vista al mar en departamentos de 1 dormitorio.',
                'short_description' => 'Apartamento moderno con vista al mar en Playa Grande',
                'main_image' => null,
                'gallery' => [],
                'amenities' => [
                    ['name' => 'Wifi', 'icon' => 'fas fa-wifi', 'available' => true],
                    ['name' => 'Aire acondicionado', 'icon' => 'fas fa-snowflake', 'available' => true],
                    ['name' => 'Televisor', 'icon' => 'fas fa-tv', 'available' => true],
                    ['name' => 'Cocina', 'icon' => 'fas fa-utensils', 'available' => true],
                    ['name' => 'Secadora', 'icon' => 'fas fa-tshirt', 'available' => false],
                    ['name' => 'Gimnasio', 'icon' => 'fas fa-dumbbell', 'available' => true]
                ],
                'services' => [
                    ['name' => 'Gimnasio', 'description' => 'Gimnasio completamente equipado', 'icon' => 'fas fa-dumbbell', 'available' => true],
                    ['name' => 'Área de juegos', 'description' => 'Zona recreativa para niños', 'icon' => 'fas fa-gamepad', 'available' => true],
                    ['name' => 'Parrilla', 'description' => 'Área de barbacoa común', 'icon' => 'fas fa-fire', 'available' => true],
                    ['name' => 'Áreas verdes', 'description' => 'Jardines y espacios verdes', 'icon' => 'fas fa-tree', 'available' => true]
                ],
                'characteristics' => [
                    ['name' => 'Piscina', 'value' => 'Piscina climatizada', 'icon' => 'fas fa-swimmer'],
                    ['name' => 'Estacionamiento', 'value' => 'Incluido', 'icon' => 'fas fa-parking'],
                    ['name' => 'Cama King', 'value' => 'Dormitorio principal', 'icon' => 'fas fa-bed'],
                    ['name' => 'Parrilla', 'value' => 'Área común', 'icon' => 'fas fa-fire']
                ],
                'house_rules' => [
                    ['text' => 'No está permitido fumar', 'icon' => 'fas fa-smoking-ban'],
                    ['text' => 'No se permiten mascotas', 'icon' => 'fas fa-paw'],
                    ['text' => 'No se permiten fiestas o eventos', 'icon' => 'fas fa-volume-mute'],
                    ['text' => 'Check-in a partir de las 15:00', 'icon' => 'fas fa-clock']
                ],
                'check_in_info' => [
                    'check_in_time' => '15:00',
                    'check_out_time' => '11:00',
                    'instructions' => 'Contactar al anfitrión al llegar',
                    'contact_info' => 'WhatsApp: +51 999 888 777'
                ],
                'rating' => 5.0,
                'reviews_count' => 124,
                'active' => true,
                'featured' => true,
                'availability_status' => 'available'
            ],
            [
                'title' => 'Departamento acogedor en San Isidro',
                'slug' => 'departamento-acogedor-san-isidro',
                'platform' => 'Booking',
                'price_per_night' => 85.00,
                'currency' => 'PEN',
                'address' => 'Av. Prescott 155',
                'district' => 'San Isidro',
                'city' => 'Lima',
                'country' => 'Perú',
                'bedrooms' => 1,
                'bathrooms' => 1,
                'max_guests' => 2,
                'area_m2' => 45,
                'description' => 'Acogedor departamento en el corazón de San Isidro, cerca de restaurantes, centros comerciales y transporte público. Ideal para viajeros de negocios y turistas que buscan comodidad y ubicación estratégica.',
                'short_description' => 'Departamento acogedor en zona financiera',
                'main_image' => null,
                'gallery' => [],
                'amenities' => [
                    ['name' => 'Wifi', 'icon' => 'fas fa-wifi', 'available' => true],
                    ['name' => 'Televisor', 'icon' => 'fas fa-tv', 'available' => true],
                    ['name' => 'Cocina', 'icon' => 'fas fa-utensils', 'available' => true],
                    ['name' => 'Lavadora', 'icon' => 'fas fa-tshirt', 'available' => true]
                ],
                'services' => [
                    ['name' => 'Seguridad 24h', 'description' => 'Vigilancia las 24 horas', 'icon' => 'fas fa-shield-alt', 'available' => true],
                    ['name' => 'Recepción', 'description' => 'Servicio de recepción', 'icon' => 'fas fa-concierge-bell', 'available' => true]
                ],
                'characteristics' => [
                    ['name' => 'Estacionamiento', 'value' => 'Disponible por S/15 adicionales', 'icon' => 'fas fa-parking'],
                    ['name' => 'Internet', 'value' => 'Fibra óptica', 'icon' => 'fas fa-wifi']
                ],
                'house_rules' => [
                    ['text' => 'No está permitido fumar', 'icon' => 'fas fa-smoking-ban'],
                    ['text' => 'Horario de silencio: 22:00 - 07:00', 'icon' => 'fas fa-volume-mute']
                ],
                'check_in_info' => [
                    'check_in_time' => '14:00',
                    'check_out_time' => '12:00',
                    'instructions' => 'Recoger llaves en recepción',
                    'contact_info' => 'Teléfono: +51 999 777 666'
                ],
                'rating' => 4.7,
                'reviews_count' => 89,
                'active' => true,
                'featured' => false,
                'availability_status' => 'available'
            ],
            [
                'title' => 'Studio en Barranco con vista al mar',
                'slug' => 'studio-barranco-vista-mar',
                'platform' => 'Airbnb',
                'price_per_night' => 95.00,
                'currency' => 'PEN',
                'address' => 'Malecón Cisneros 140',
                'district' => 'Barranco',
                'city' => 'Lima',
                'country' => 'Perú',
                'bedrooms' => 1,
                'bathrooms' => 1,
                'max_guests' => 2,
                'area_m2' => 35,
                'description' => 'Hermoso studio con vista panorámica al océano Pacífico, ubicado en el bohemio distrito de Barranco. Perfecto para parejas que buscan una escapada romántica con arte, cultura y gastronomía.',
                'short_description' => 'Studio bohemio con vista al mar',
                'main_image' => null,
                'gallery' => [],
                'amenities' => [
                    ['name' => 'Wifi', 'icon' => 'fas fa-wifi', 'available' => true],
                    ['name' => 'Televisor', 'icon' => 'fas fa-tv', 'available' => true],
                    ['name' => 'Cocina', 'icon' => 'fas fa-utensils', 'available' => true],
                    ['name' => 'Balcón', 'icon' => 'fas fa-door-open', 'available' => true]
                ],
                'services' => [
                    ['name' => 'Vista al mar', 'description' => 'Vista panorámica al océano', 'icon' => 'fas fa-water', 'available' => true],
                    ['name' => 'Cerca de galerías', 'description' => 'A pasos de galerías de arte', 'icon' => 'fas fa-palette', 'available' => true]
                ],
                'characteristics' => [
                    ['name' => 'Balcón', 'value' => 'Con vista al mar', 'icon' => 'fas fa-door-open'],
                    ['name' => 'Arte local', 'value' => 'Decoración con arte peruano', 'icon' => 'fas fa-palette']
                ],
                'house_rules' => [
                    ['text' => 'No está permitido fumar', 'icon' => 'fas fa-smoking-ban'],
                    ['text' => 'Respetar horarios de silencio', 'icon' => 'fas fa-volume-mute']
                ],
                'check_in_info' => [
                    'check_in_time' => '15:00',
                    'check_out_time' => '11:00',
                    'instructions' => 'Caja fuerte con código en la entrada',
                    'contact_info' => 'WhatsApp: +51 999 555 444'
                ],
                'rating' => 4.9,
                'reviews_count' => 67,
                'active' => true,
                'featured' => true,
                'availability_status' => 'available'
            ],
            [
                'title' => 'Loft moderno en La Molina',
                'slug' => 'loft-moderno-la-molina',
                'platform' => 'Vrbo',
                'price_per_night' => 140.00,
                'currency' => 'PEN',
                'address' => 'Av. La Fontana 550',
                'district' => 'La Molina',
                'city' => 'Lima',
                'country' => 'Perú',
                'bedrooms' => 2,
                'bathrooms' => 2,
                'max_guests' => 4,
                'area_m2' => 80,
                'description' => 'Espacioso loft de diseño moderno en La Molina, con acabados de lujo y todas las comodidades. Ideal para familias o grupos de amigos que buscan espacio y confort en una zona residencial exclusiva.',
                'short_description' => 'Loft espacioso en zona residencial exclusiva',
                'main_image' => null,
                'gallery' => [],
                'amenities' => [
                    ['name' => 'Wifi', 'icon' => 'fas fa-wifi', 'available' => true],
                    ['name' => 'Aire acondicionado', 'icon' => 'fas fa-snowflake', 'available' => true],
                    ['name' => 'Televisor', 'icon' => 'fas fa-tv', 'available' => true],
                    ['name' => 'Cocina completa', 'icon' => 'fas fa-utensils', 'available' => true],
                    ['name' => 'Lavadora', 'icon' => 'fas fa-tshirt', 'available' => true],
                    ['name' => 'Gimnasio', 'icon' => 'fas fa-dumbbell', 'available' => true]
                ],
                'services' => [
                    ['name' => 'Piscina', 'description' => 'Piscina común del edificio', 'icon' => 'fas fa-swimmer', 'available' => true],
                    ['name' => 'Gimnasio', 'description' => 'Gimnasio equipado', 'icon' => 'fas fa-dumbbell', 'available' => true],
                    ['name' => 'Seguridad', 'description' => 'Seguridad 24/7', 'icon' => 'fas fa-shield-alt', 'available' => true]
                ],
                'characteristics' => [
                    ['name' => 'Piscina', 'value' => 'Piscina del edificio', 'icon' => 'fas fa-swimmer'],
                    ['name' => 'Estacionamiento', 'value' => '2 espacios incluidos', 'icon' => 'fas fa-parking'],
                    ['name' => 'Terraza', 'value' => 'Terraza privada', 'icon' => 'fas fa-home']
                ],
                'house_rules' => [
                    ['text' => 'No está permitido fumar', 'icon' => 'fas fa-smoking-ban'],
                    ['text' => 'Máximo 4 huéspedes', 'icon' => 'fas fa-users'],
                    ['text' => 'No se permiten mascotas', 'icon' => 'fas fa-paw']
                ],
                'check_in_info' => [
                    'check_in_time' => '16:00',
                    'check_out_time' => '11:00',
                    'instructions' => 'Recepción del edificio',
                    'contact_info' => 'Teléfono: +51 999 333 222'
                ],
                'rating' => 4.8,
                'reviews_count' => 45,
                'active' => true,
                'featured' => false,
                'availability_status' => 'available'
            ]
        ];

        foreach ($properties as $propertyData) {
            Property::create($propertyData);
        }
    }
}
