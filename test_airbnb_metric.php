<?php

require_once 'vendor/autoload.php';

// Configurar Laravel
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\PropertyMetric;
use App\Models\Property;

echo "=== PRUEBA DE REGISTRO DE MÉTRICA AIRBNB ===\n";

// 1. Verificar que existe la propiedad
$propertyId = '9f855524-9948-4ab1-ada6-2cf04ce709a3';
$property = Property::find($propertyId);

if ($property) {
    echo "✅ Propiedad encontrada: {$property->title}\n";
} else {
    echo "❌ Propiedad NO encontrada con ID: {$propertyId}\n";
    
    // Buscar cualquier propiedad disponible
    $anyProperty = Property::first();
    if ($anyProperty) {
        $propertyId = $anyProperty->id;
        echo "🔄 Usando propiedad alternativa: {$anyProperty->title} (ID: {$propertyId})\n";
    } else {
        echo "❌ No hay propiedades en la base de datos\n";
        exit(1);
    }
}

// 2. Verificar registros existentes de airbnb_click
$existingAirbnbClicks = PropertyMetric::where('event_type', 'airbnb_click')->count();
echo "📊 Clicks de Airbnb existentes: {$existingAirbnbClicks}\n";

// 3. Intentar crear un nuevo registro
try {
    $metric = PropertyMetric::create([
        'property_id' => $propertyId,
        'event_type' => 'airbnb_click',
        'user_ip' => '127.0.0.1',
        'user_agent' => 'Test Script',
        'referrer' => 'http://localhost/test',
        'metadata' => [
            'test' => true,
            'timestamp' => now()->toISOString(),
            'debug' => 'manual_test'
        ]
    ]);
    
    echo "✅ Registro creado exitosamente!\n";
    echo "   - ID: {$metric->id}\n";
    echo "   - Property ID: {$metric->property_id}\n";
    echo "   - Event Type: {$metric->event_type}\n";
    echo "   - Created At: {$metric->created_at}\n";
    
} catch (Exception $e) {
    echo "❌ ERROR al crear registro: {$e->getMessage()}\n";
    echo "   - File: {$e->getFile()}\n";
    echo "   - Line: {$e->getLine()}\n";
}

// 4. Verificar el conteo después del intento
$newAirbnbClicks = PropertyMetric::where('event_type', 'airbnb_click')->count();
echo "📊 Clicks de Airbnb después del test: {$newAirbnbClicks}\n";

// 5. Mostrar los últimos 5 registros para debugging
echo "\n=== ÚLTIMOS 5 REGISTROS ===\n";
$lastMetrics = PropertyMetric::orderBy('created_at', 'desc')->limit(5)->get();
foreach ($lastMetrics as $metric) {
    echo "- [{$metric->id}] {$metric->event_type} para propiedad {$metric->property_id} a las {$metric->created_at}\n";
}

echo "\n=== FIN DE LA PRUEBA ===\n";
