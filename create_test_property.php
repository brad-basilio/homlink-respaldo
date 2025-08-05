<?php

require 'vendor/autoload.php';
require 'bootstrap/app.php';

$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Property;
use App\Models\User;

echo "=== VERIFICANDO Y CREANDO PROPIEDADES DE PRUEBA ===\n\n";

// Verificar si ya hay propiedades
$existingProperties = Property::count();
echo "Propiedades existentes: {$existingProperties}\n\n";

if ($existingProperties > 0) {
    $property = Property::first();
    echo "Propiedad encontrada:\n";
    echo "  - ID: {$property->id}\n";
    echo "  - Título: {$property->title}\n";
    echo "  - Slug: {$property->slug}\n";
    echo "  - URL: /property/{$property->slug}\n\n";
    
    echo "Datos actuales:\n";
    echo "  - Amenidades: " . json_encode($property->amenities) . "\n";
    echo "  - Servicios: " . json_encode($property->services) . "\n";
    echo "  - Características: " . json_encode($property->characteristics) . "\n";
    echo "  - Reglas de casa: " . json_encode($property->house_rules) . "\n";
    
} else {
    echo "No hay propiedades. Creando una de prueba...\n";
    
    // Buscar un usuario para asignar la propiedad
    $user = User::first();
    if (!$user) {
        echo "❌ No hay usuarios. Necesitas crear un usuario primero.\n";
        exit;
    }
    
    $property = Property::create([
        'user_id' => $user->id,
        'title' => 'Departamento de Prueba con Amenidades',
        'slug' => 'departamento-prueba-amenidades',
        'platform' => 'Airbnb',
        'property_type' => 'Departamento',
        'price_per_night' => 150.00,
        'currency' => 'PEN',
        'address' => 'Av. Ejemplo 123',
        'department' => 'Lima',
        'province' => 'Lima',
        'district' => 'Miraflores',
        'country' => 'Perú',
        'bedrooms' => 2,
        'beds' => 2,
        'bathrooms' => 2,
        'max_guests' => 4,
        'description' => 'Hermoso departamento con todas las comodidades para una estancia perfecta.',
        'short_description' => 'Departamento cómodo en Miraflores',
        'amenities' => ['WiFi', 'TV', 'Cocina', 'Lavadora', 'Aire acondicionado'], // Usando nombres del formulario
        'services' => ['Servicio de limpieza', 'Desayuno incluido'],
        'characteristics' => ['Vista a la ciudad', 'Diseño moderno'],
        'house_rules' => ['No se permite fumar', 'Horas de silencio'],
        'active' => true,
        'admin_approved' => true,
        'featured' => true,
        'availability_status' => 'available'
    ]);
    
    echo "✅ Propiedad creada:\n";
    echo "  - ID: {$property->id}\n";
    echo "  - Título: {$property->title}\n";
    echo "  - Slug: {$property->slug}\n";
    echo "  - URL: /property/{$property->slug}\n";
}

echo "\n=== INSTRUCCIONES ===\n";
echo "1. Visita la URL de la propiedad en tu navegador\n";
echo "2. Abre las herramientas de desarrollador (F12)\n";
echo "3. Ve a la pestaña Console\n";
echo "4. Busca los mensajes de debug que empiecen con '🔍 DEBUGGING PropertyDetail'\n";
echo "5. Verifica que los íconos se muestren correctamente en las secciones\n";
