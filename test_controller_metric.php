<?php

require_once 'vendor/autoload.php';

// Configurar Laravel
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Http\Controllers\Admin\PropertyMetricsController;
use Illuminate\Http\Request;
use App\Models\PropertyMetric;

echo "=== PRUEBA DEL CONTROLADOR PROPERTY METRICS ===\n";

// Contar registros antes
$beforeCount = PropertyMetric::where('event_type', 'airbnb_click')->count();
echo "📊 Clicks de Airbnb antes: {$beforeCount}\n";

// Simular una petición HTTP
$request = new Request();
$request->merge([
    'property_id' => '9f855524-9948-4ab1-ada6-2cf04ce709a3',
    'event_type' => 'airbnb_click',
    'metadata' => [
        'test' => 'controller_test',
        'timestamp' => now()->toISOString()
    ]
]);

// Simular IP y User Agent
$request->server->set('REMOTE_ADDR', '127.0.0.1');
$request->headers->set('User-Agent', 'Test Controller Script');
$request->headers->set('Referer', 'http://localhost/property/test');

echo "🔄 Simulando petición al controlador...\n";
echo "   - Property ID: {$request->get('property_id')}\n";
echo "   - Event Type: {$request->get('event_type')}\n";
echo "   - IP: {$request->ip()}\n";

try {
    // Crear instancia del controlador
    $controller = new PropertyMetricsController();
    
    // Llamar al método track
    $response = $controller->track($request);
    
    // Obtener el contenido de la respuesta
    $responseData = json_decode($response->getContent(), true);
    $statusCode = $response->getStatusCode();
    
    echo "✅ Respuesta del controlador:\n";
    echo "   - Status Code: {$statusCode}\n";
    echo "   - Content: " . json_encode($responseData, JSON_PRETTY_PRINT) . "\n";
    
} catch (Exception $e) {
    echo "❌ ERROR en el controlador: {$e->getMessage()}\n";
    echo "   - File: {$e->getFile()}\n";
    echo "   - Line: {$e->getLine()}\n";
    echo "   - Trace: {$e->getTraceAsString()}\n";
}

// Contar registros después
$afterCount = PropertyMetric::where('event_type', 'airbnb_click')->count();
echo "📊 Clicks de Airbnb después: {$afterCount}\n";

if ($afterCount > $beforeCount) {
    echo "✅ El controlador registró la métrica correctamente!\n";
} else {
    echo "❌ El controlador NO registró la métrica\n";
}

echo "\n=== FIN DE LA PRUEBA DEL CONTROLADOR ===\n";
