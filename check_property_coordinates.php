<?php
require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Property;

echo "🔍 Verificando estructura de coordenadas en Property...\n\n";

$property = Property::first();
if ($property) {
    echo "🏠 Estructura de Property desde DB:\n";
    echo "ID: " . $property->id . "\n";
    echo "Title: " . $property->title . "\n";
    echo "Latitude: " . ($property->latitude ?? 'NULL') . "\n";
    echo "Longitude: " . ($property->longitude ?? 'NULL') . "\n";
    echo "Lat field exists: " . (isset($property->latitude) ? 'YES' : 'NO') . "\n";
    echo "Lng field exists: " . (isset($property->longitude) ? 'YES' : 'NO') . "\n";
    echo "\n";
    
    // Mostrar todos los campos disponibles
    echo "Campos disponibles relacionados con ubicación:\n";
    $attributes = $property->getAttributes();
    foreach ($attributes as $key => $value) {
        if (str_contains(strtolower($key), 'lat') || 
            str_contains(strtolower($key), 'lng') || 
            str_contains(strtolower($key), 'lon') ||
            str_contains(strtolower($key), 'coord') ||
            str_contains(strtolower($key), 'address') ||
            str_contains(strtolower($key), 'location')) {
            echo "  - $key: " . ($value ?? 'NULL') . "\n";
        }
    }
    
    echo "\n🔍 Verificando datos que llegan al UserDashboard:\n";
    
    // Simular la consulta que hace UserDashboardController
    $properties = Property::where('user_id', $property->user_id)->get();
        
    if ($properties->count() > 0) {
        $firstProp = $properties->first();
        echo "Datos como se envían al frontend:\n";
        echo "latitude: " . ($firstProp->latitude ?? 'NULL') . "\n";
        echo "longitude: " . ($firstProp->longitude ?? 'NULL') . "\n";
        
        // Convertir a array como se hace en el controller
        $propArray = $firstProp->toArray();
        echo "\nEn formato array:\n";
        echo "latitude: " . ($propArray['latitude'] ?? 'NULL') . "\n";
        echo "longitude: " . ($propArray['longitude'] ?? 'NULL') . "\n";
    }
    
} else {
    echo "❌ No se encontraron propiedades\n";
}
?>
