<?php

require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

echo "🧹 Limpiando métrica específica que está bloqueando...\n\n";

$propertyId = '9f91adea-eb98-480b-b1ef-4f0c5e380511';
$eventType = 'property_view';
$laravelSessionId = 'FwSDrbjs7NMXBl8bDEaXB31WgPR6tCH5L5gEfILJ';

// Buscar la métrica específica que está causando el bloqueo
$blockingMetric = DB::table('property_metrics')
    ->where('property_id', $propertyId)
    ->where('event_type', $eventType)
    ->where('session_id', $laravelSessionId)
    ->first();

if ($blockingMetric) {
    echo "🎯 Métrica bloqueante encontrada:\n";
    echo "   ID: {$blockingMetric->id}\n";
    echo "   Property: {$blockingMetric->property_id}\n";
    echo "   Event: {$blockingMetric->event_type}\n";
    echo "   Session: {$blockingMetric->session_id}\n";
    echo "   Created: {$blockingMetric->created_at}\n\n";
    
    // Eliminar la métrica específica
    $deleted = DB::table('property_metrics')
        ->where('id', $blockingMetric->id)
        ->delete();
    
    if ($deleted) {
        echo "✅ Métrica bloqueante eliminada exitosamente.\n";
        echo "   ID eliminado: {$blockingMetric->id}\n";
    } else {
        echo "❌ Error al eliminar la métrica.\n";
    }
} else {
    echo "🔍 No se encontró métrica bloqueante con esos parámetros.\n";
    
    // Buscar todas las métricas de esa propiedad y evento
    $allMetrics = DB::table('property_metrics')
        ->where('property_id', $propertyId)
        ->where('event_type', $eventType)
        ->get(['id', 'session_id', 'created_at']);
    
    echo "\n📊 Métricas existentes para esta propiedad y evento:\n";
    foreach ($allMetrics as $metric) {
        echo "   ID: {$metric->id} | Session: " . ($metric->session_id ?: 'NULL') . " | Created: {$metric->created_at}\n";
    }
}

echo "\n🔄 Verificación después de limpieza:\n";

// Verificar que no hay métricas bloqueantes
$remainingMetrics = DB::table('property_metrics')
    ->where('property_id', $propertyId)
    ->where('event_type', $eventType)
    ->count();

echo "📈 Métricas restantes para esta propiedad/evento: {$remainingMetrics}\n";

if ($remainingMetrics == 0) {
    echo "✅ Base de datos limpia. El siguiente request debería crear una nueva métrica.\n";
} else {
    echo "⚠️  Aún hay métricas existentes. Puede que haya otros session_ids.\n";
}

echo "\n🎯 Limpieza completada.\n";

?>
