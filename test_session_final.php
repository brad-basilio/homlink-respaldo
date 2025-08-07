<?php

require_once __DIR__ . '/vendor/autoload.php';

use App\Models\PropertyMetric;

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "🎯 PRUEBA FINAL DEL SISTEMA DE SESSION_ID\n";
echo "==========================================\n\n";

// Simular datos como vienen del frontend
$test_session_id = 'test_final_' . time();
$test_data = [
    'property_id' => '9f91adea-eb98-480b-b1ef-4f0c5e380511', // Usar el UUID real que viste en la BD
    'event_type' => 'property_view',
    'session_id' => $test_session_id,
    'user_ip' => '127.0.0.1',
    'user_agent' => 'Test Browser Final',
    'referrer' => 'http://localhost:8000',
    'metadata' => json_encode([
        'test' => 'final_test',
        'session_controlled' => true
    ])
];

echo "📝 Datos de prueba:\n";
echo "Property ID: " . $test_data['property_id'] . "\n";
echo "Event Type: " . $test_data['event_type'] . "\n";
echo "Session ID: " . $test_data['session_id'] . "\n";
echo "User IP: " . $test_data['user_ip'] . "\n\n";

try {
    // PRUEBA 1: Crear métrica usando el nuevo método track() con session_id
    echo "🧪 PRUEBA 1: Método track() con session_id\n";
    echo "-------------------------------------------\n";
    
    $metric = PropertyMetric::track(
        $test_data['property_id'],
        $test_data['event_type'],
        $test_data['session_id'], // ✅ PASAR SESSION_ID
        [
            'test' => 'final_test',
            'session_controlled' => true
        ]
    );
    
    echo "✅ ÉXITO: Registro creado con ID: " . $metric->id . "\n";
    echo "🔍 Session ID guardado: " . ($metric->session_id ?: 'NULL') . "\n";
    
    if ($metric->session_id === $test_data['session_id']) {
        echo "🎉 ¡PERFECTO! El session_id coincide exactamente.\n\n";
    } else {
        echo "❌ ERROR: Session_id no coincide.\n";
        echo "  - Esperado: " . $test_data['session_id'] . "\n";
        echo "  - Obtenido: " . ($metric->session_id ?: 'NULL') . "\n\n";
    }
    
    // PRUEBA 2: Verificar que mass assignment funciona directamente
    echo "🧪 PRUEBA 2: Mass assignment directo\n";
    echo "------------------------------------\n";
    
    $direct_data = [
        'property_id' => $test_data['property_id'],
        'event_type' => 'gallery_view',
        'session_id' => $test_data['session_id'] . '_direct',
        'user_ip' => $test_data['user_ip'],
        'user_agent' => $test_data['user_agent'],
        'referrer' => $test_data['referrer'],
        'metadata' => ['test' => 'direct_mass_assignment']
    ];
    
    $directMetric = PropertyMetric::create($direct_data);
    
    echo "✅ ÉXITO: Registro directo creado con ID: " . $directMetric->id . "\n";
    echo "🔍 Session ID guardado: " . ($directMetric->session_id ?: 'NULL') . "\n";
    
    if ($directMetric->session_id === $direct_data['session_id']) {
        echo "🎉 ¡PERFECTO! Mass assignment funciona correctamente.\n\n";
    } else {
        echo "❌ ERROR: Mass assignment no funciona.\n\n";
    }
    
} catch (Exception $e) {
    echo "❌ ERROR: " . $e->getMessage() . "\n\n";
}

// Mostrar los últimos registros para verificar
echo "📋 Últimos 5 registros de la tabla:\n";
echo "------------------------------------\n";
$recent = PropertyMetric::orderBy('id', 'desc')->take(5)->get();
foreach ($recent as $record) {
    echo sprintf(
        "ID: %-3s | Event: %-15s | Session ID: %-25s | Created: %s\n",
        $record->id,
        $record->event_type,
        $record->session_id ?: 'NULL',
        $record->created_at->format('Y-m-d H:i:s')
    );
}

echo "\n🏁 Prueba final completada.\n";

// Limpiar los registros de prueba
echo "\n🧹 Limpiando registros de prueba...\n";
$deletedCount = PropertyMetric::where('session_id', 'like', 'test_%')->delete();
echo "✅ {$deletedCount} registros de prueba eliminados.\n";
