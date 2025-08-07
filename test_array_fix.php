<?php

require_once __DIR__ . '/vendor/autoload.php';

use App\Models\PropertyMetric;

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "🔧 PRUEBA RÁPIDA - FIX ARRAY TO STRING\n";
echo "====================================\n\n";

// Simular datos exactos como vienen del frontend
$test_data = [
    'property_id' => '9f91adea-eb98-480b-b1ef-4f0c5e380511',
    'event_type' => 'property_view',
    'session_id' => 'test_array_fix_' . time(),
    'metadata' => [
        'page' => 'property_detail',
        'title' => 'Nuevo apartamento con vista al mar',
        'slug' => 'nuevoo-apartamento-con-vista-al-mar',
        'session_controlled' => true,
        'timestamp' => '2025-08-07T10:12:05.000Z',
        'source' => 'property_detail_page',
        'execution_count' => 1
    ]
];

echo "📝 Datos de prueba:\n";
echo "Property ID: " . $test_data['property_id'] . "\n";
echo "Event Type: " . $test_data['event_type'] . "\n";
echo "Session ID: " . $test_data['session_id'] . "\n";
echo "Metadata (array): " . json_encode($test_data['metadata']) . "\n\n";

try {
    echo "🧪 Probando método track() con array metadata...\n";
    
    $metric = PropertyMetric::track(
        $test_data['property_id'],
        $test_data['event_type'],
        $test_data['session_id'],
        $test_data['metadata'] // ✅ PASAR ARRAY - debe convertirse a JSON automáticamente
    );
    
    echo "✅ ÉXITO: Registro creado con ID: " . $metric->id . "\n";
    echo "🔍 Session ID guardado: " . ($metric->session_id ?: 'NULL') . "\n";
    echo "📋 Metadata guardado: " . ($metric->metadata ? json_encode($metric->metadata) : 'NULL') . "\n";
    
    // Verificar que se guardó correctamente
    $saved_metric = PropertyMetric::find($metric->id);
    echo "\n📊 Verificación de datos guardados:\n";
    echo "ID: " . $saved_metric->id . "\n";
    echo "Property ID: " . $saved_metric->property_id . "\n";
    echo "Event Type: " . $saved_metric->event_type . "\n";
    echo "Session ID: " . ($saved_metric->session_id ?: 'NULL') . "\n";
    echo "Metadata (recuperado como array): " . json_encode($saved_metric->metadata) . "\n";
    echo "Created At: " . $saved_metric->created_at . "\n";
    
    if ($saved_metric->session_id === $test_data['session_id']) {
        echo "\n🎉 ¡PERFECTO! Session_id guardado correctamente.\n";
    } else {
        echo "\n❌ ERROR: Session_id no coincide.\n";
    }
    
    if (is_array($saved_metric->metadata) && !empty($saved_metric->metadata)) {
        echo "🎉 ¡PERFECTO! Metadata guardado y recuperado como array correctamente.\n";
    } else {
        echo "❌ ERROR: Metadata no se guardó o recuperó correctamente.\n";
    }
    
} catch (Exception $e) {
    echo "❌ ERROR: " . $e->getMessage() . "\n";
    echo "📋 Stack trace:\n" . $e->getTraceAsString() . "\n";
}

echo "\n🏁 Prueba completada.\n";

// Limpiar el registro de prueba
echo "\n🧹 Limpiando registro de prueba...\n";
if (isset($metric) && $metric->id) {
    PropertyMetric::where('id', $metric->id)->delete();
    echo "✅ Registro de prueba eliminado.\n";
}
