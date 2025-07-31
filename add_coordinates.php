<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Property;

// Coordenadas de ejemplo para diferentes distritos de Lima
$coordinates = [
    'Miraflores' => ['lat' => -12.1211, 'lng' => -77.0269],
    'San Isidro' => ['lat' => -12.0964, 'lng' => -77.0458],
    'Barranco' => ['lat' => -12.1463, 'lng' => -77.0217],
    'Surco' => ['lat' => -12.1342, 'lng' => -76.9947],
    'La Molina' => ['lat' => -12.0792, 'lng' => -76.9447],
];

echo "Agregando coordenadas a las propiedades...\n";

$properties = Property::all();

foreach ($properties as $index => $property) {
    // Usar coordenadas diferentes para cada propiedad
    $coordKeys = array_keys($coordinates);
    $coordKey = $coordKeys[$index % count($coordKeys)];
    $coord = $coordinates[$coordKey];
    
    // Agregar un poco de variación para que no estén todas en el mismo punto
    $variation = 0.001; // Aproximadamente 100 metros
    $lat = $coord['lat'] + (rand(-100, 100) / 100000);
    $lng = $coord['lng'] + (rand(-100, 100) / 100000);
    
    $property->latitude = $lat;
    $property->longitude = $lng;
    $property->save();
    
    echo "✓ {$property->title} - Coordenadas: {$lat}, {$lng} (Zona: {$coordKey})\n";
}

echo "\n¡Coordenadas agregadas exitosamente a todas las propiedades!\n";
echo "Ahora puedes ver los mapas de Google Maps en PropertyDetail.\n";
