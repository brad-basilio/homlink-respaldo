<?php

// Script de debug para verificar el problema con amenidades

require_once 'vendor/autoload.php';

use App\Models\Property;
use Illuminate\Support\Facades\Log;

// Cargar configuración
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "=== SCRIPT DE DEBUG PARA AMENIDADES ===\n\n";

// Obtener una propiedad de ejemplo
$property = Property::first();

if ($property) {
    echo "Propiedad encontrada: {$property->title}\n\n";
    
    echo "AMENIDADES:\n";
    echo "Raw: " . $property->getRawOriginal('amenities') . "\n";
    echo "Parsed: " . json_encode($property->amenities) . "\n";
    echo "Type: " . gettype($property->amenities) . "\n\n";
    
    echo "SERVICIOS:\n";
    echo "Raw: " . $property->getRawOriginal('services') . "\n";
    echo "Parsed: " . json_encode($property->services) . "\n";
    echo "Type: " . gettype($property->services) . "\n\n";
    
    echo "CARACTERÍSTICAS:\n";
    echo "Raw: " . $property->getRawOriginal('characteristics') . "\n";
    echo "Parsed: " . json_encode($property->characteristics) . "\n";
    echo "Type: " . gettype($property->characteristics) . "\n\n";
    
    echo "REGLAS:\n";
    echo "Raw: " . $property->getRawOriginal('house_rules') . "\n";
    echo "Parsed: " . json_encode($property->house_rules) . "\n";
    echo "Type: " . gettype($property->house_rules) . "\n\n";
    
    // Simular actualización
    echo "=== SIMULANDO ACTUALIZACIÓN ===\n";
    
    $testAmenities = ['wifi', 'tv', 'kitchen'];
    $testServices = ['cleaning', 'transport'];
    $testCharacteristics = ['modern', 'luxury'];
    $testHouseRules = ['no_pets', 'no_smoking'];
    
    echo "Amenidades de prueba: " . json_encode($testAmenities) . "\n";
    echo "Servicios de prueba: " . json_encode($testServices) . "\n";
    echo "Características de prueba: " . json_encode($testCharacteristics) . "\n";
    echo "Reglas de prueba: " . json_encode($testHouseRules) . "\n\n";
    
    // Simular actualización
    $property->update([
        'amenities' => $testAmenities,
        'services' => $testServices,
        'characteristics' => $testCharacteristics,
        'house_rules' => $testHouseRules
    ]);
    
    echo "=== DESPUÉS DE ACTUALIZACIÓN ===\n";
    $property->refresh();
    
    echo "AMENIDADES ACTUALIZADAS:\n";
    echo "Raw: " . $property->getRawOriginal('amenities') . "\n";
    echo "Parsed: " . json_encode($property->amenities) . "\n\n";
    
    echo "SERVICIOS ACTUALIZADOS:\n";
    echo "Raw: " . $property->getRawOriginal('services') . "\n";
    echo "Parsed: " . json_encode($property->services) . "\n\n";
    
} else {
    echo "No se encontraron propiedades en la base de datos.\n";
}

echo "=== FIN DEL DEBUG ===\n";

?>
