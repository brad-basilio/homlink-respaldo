<?php

require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

echo "🔍 Verificando métricas en la base de datos...\n\n";

// Verificar métricas para esta propiedad específica
$propertyId = '9f91adea-eb98-480b-b1ef-4f0c5e380511';
$eventType = 'property_view';

$metrics = DB::table('property_metrics')
    ->where('property_id', $propertyId)
    ->where('event_type', $eventType)
    ->orderBy('created_at', 'desc')
    ->limit(10)
    ->get(['id', 'session_id', 'event_type', 'created_at', 'metadata']);

echo "📊 Métricas encontradas para propiedad: {$propertyId}\n";
echo "📋 Tipo de evento: {$eventType}\n";
echo "📈 Total de registros: " . $metrics->count() . "\n\n";

if ($metrics->count() > 0) {
    echo "🔍 Detalles de las métricas:\n";
    echo str_repeat("-", 120) . "\n";
    echo sprintf("%-5s | %-40s | %-15s | %-20s | %-30s\n", 
        "ID", "SESSION_ID", "EVENT_TYPE", "CREATED_AT", "METADATA_PREVIEW"
    );
    echo str_repeat("-", 120) . "\n";
    
    foreach ($metrics as $metric) {
        $metadataPreview = $metric->metadata ? 
            substr(str_replace(["\n", "\r"], '', $metric->metadata), 0, 30) . '...' : 
            'NULL';
            
        echo sprintf("%-5s | %-40s | %-15s | %-20s | %-30s\n",
            $metric->id,
            $metric->session_id ?: 'NULL',
            $metric->event_type,
            $metric->created_at,
            $metadataPreview
        );
    }
    echo str_repeat("-", 120) . "\n";
} else {
    echo "❌ No se encontraron métricas para esta propiedad y evento.\n";
}

echo "\n";

// Verificar session_ids únicos
echo "🆔 Session IDs únicos encontrados:\n";
$uniqueSessions = DB::table('property_metrics')
    ->where('property_id', $propertyId)
    ->where('event_type', $eventType)
    ->distinct()
    ->pluck('session_id');

foreach ($uniqueSessions as $sessionId) {
    $count = DB::table('property_metrics')
        ->where('property_id', $propertyId)
        ->where('event_type', $eventType)
        ->where('session_id', $sessionId)
        ->count();
    
    echo "  - " . ($sessionId ?: 'NULL') . " (aparece {$count} veces)\n";
}

echo "\n📋 Verificación completada.\n";

?>
