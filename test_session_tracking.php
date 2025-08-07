<?php

require_once __DIR__ . '/vendor/autoload.php';

use App\Models\PropertyMetric;

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "🧪 TESTING SESSION TRACKING FUNCTIONALITY\n";
echo "=========================================\n\n";

// Simular un tracking de métrica con session_id
$test_data = [
    'property_id' => 1,
    'event_type' => 'property_view',
    'session_id' => 'test_session_' . time(),
    'user_ip' => '127.0.0.1',
    'user_agent' => 'Test Browser',
    'referrer' => 'http://test.com',
    'metadata' => json_encode(['test' => true])
];

echo "📝 Datos de prueba:\n";
echo "Property ID: " . $test_data['property_id'] . "\n";
echo "Event Type: " . $test_data['event_type'] . "\n";
echo "Session ID: " . $test_data['session_id'] . "\n";
echo "User IP: " . $test_data['user_ip'] . "\n\n";

try {
    // Crear registro usando mass assignment
    $metric = PropertyMetric::create($test_data);
    
    echo "✅ ÉXITO: Registro creado con ID: " . $metric->id . "\n";
    echo "🔍 Session ID guardado: " . ($metric->session_id ?: 'NULL') . "\n\n";
    
    // Verificar que se guardó correctamente
    $saved_metric = PropertyMetric::find($metric->id);
    echo "📊 Verificación de datos guardados:\n";
    echo "ID: " . $saved_metric->id . "\n";
    echo "Property ID: " . $saved_metric->property_id . "\n";
    echo "Event Type: " . $saved_metric->event_type . "\n";
    echo "Session ID: " . ($saved_metric->session_id ?: 'NULL') . "\n";
    echo "User IP: " . $saved_metric->user_ip . "\n";
    echo "Created At: " . $saved_metric->created_at . "\n\n";
    
    if ($saved_metric->session_id) {
        echo "🎉 ¡PERFECTO! El session_id se guardó correctamente.\n";
    } else {
        echo "❌ ERROR: El session_id sigue siendo NULL.\n";
    }
    
} catch (Exception $e) {
    echo "❌ ERROR al crear métrica: " . $e->getMessage() . "\n";
}

echo "\n📈 Conteo total de métricas en la tabla:\n";
$total = PropertyMetric::count();
echo "Total de registros: " . $total . "\n";

// Mostrar últimos 3 registros para comparar
echo "\n📋 Últimos 3 registros:\n";
$recent = PropertyMetric::orderBy('id', 'desc')->take(3)->get();
foreach ($recent as $record) {
    echo "ID: " . $record->id . " | Event: " . $record->event_type . " | Session ID: " . ($record->session_id ?: 'NULL') . " | Created: " . $record->created_at . "\n";
}

echo "\n🏁 Prueba completada.\n";
