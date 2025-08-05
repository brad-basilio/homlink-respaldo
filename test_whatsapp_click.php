<?php

require_once 'vendor/autoload.php';

// Configurar el entorno Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\PropertyMetric;
use App\Models\Property;

// ID de la primera propiedad
$propertyId = '9f855524-9948-4ab1-ada6-2cf04ce709a3';

echo "🧪 Prueba de registro de métricas - WhatsApp Click" . PHP_EOL;
echo "Propiedad ID: " . $propertyId . PHP_EOL;

// Registrar métrica de WhatsApp click
try {
    $metric = PropertyMetric::create([
        'property_id' => $propertyId,
        'event_type' => 'whatsapp_click',
        'user_ip' => '127.0.0.1',
        'user_agent' => 'Test Script',
        'referrer' => null,
        'metadata' => [
            'test' => true,
            'timestamp' => now()->toISOString()
        ]
    ]);
    
    echo "✅ Métrica WhatsApp registrada exitosamente - ID: " . $metric->id . PHP_EOL;
} catch (Exception $e) {
    echo "❌ Error registrando métrica: " . $e->getMessage() . PHP_EOL;
    exit(1);
}

// Verificar conteos actuales
$totalViews = PropertyMetric::where('event_type', 'property_view')->count();
$totalAirbnbClicks = PropertyMetric::where('event_type', 'airbnb_click')->count();
$totalWhatsappClicks = PropertyMetric::where('event_type', 'whatsapp_click')->count();

echo PHP_EOL . "📊 Métricas actuales:" . PHP_EOL;
echo "Views: " . $totalViews . PHP_EOL;
echo "Airbnb Clicks: " . $totalAirbnbClicks . PHP_EOL;
echo "WhatsApp Clicks: " . $totalWhatsappClicks . PHP_EOL;

// Calcular tasas de conversión
if ($totalViews > 0) {
    $airbnbConversion = round(($totalAirbnbClicks / $totalViews) * 100, 1);
    $whatsappConversion = round(($totalWhatsappClicks / $totalViews) * 100, 1);
    
    echo PHP_EOL . "📈 Tasas de Conversión:" . PHP_EOL;
    echo "View → Airbnb: " . $airbnbConversion . "%" . PHP_EOL;
    echo "View → WhatsApp: " . $whatsappConversion . "%" . PHP_EOL;
} else {
    echo "⚠️ No hay visualizaciones para calcular conversión" . PHP_EOL;
}

echo PHP_EOL . "✅ Prueba completada" . PHP_EOL;
