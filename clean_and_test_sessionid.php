<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "🧹 LIMPIANDO REGISTROS DUPLICADOS Y PROBANDO SESSION_ID\n";
echo "===================================================\n\n";

// Eliminar registros con session_id NULL (los duplicados problemáticos)
echo "🗑️ Eliminando registros con session_id NULL...\n";
$deletedCount = DB::table('property_metrics')
    ->whereNull('session_id')
    ->delete();

echo "✅ Eliminados {$deletedCount} registros con session_id NULL\n\n";

// Mostrar estado actual
echo "📊 Estado actual de la tabla property_metrics:\n";
$currentMetrics = DB::table('property_metrics')
    ->select('event_type', 'session_id', 'created_at', 'property_id')
    ->orderBy('created_at', 'desc')
    ->limit(10)
    ->get();

foreach ($currentMetrics as $metric) {
    echo "- {$metric->event_type} | Session: {$metric->session_id} | {$metric->created_at}\n";
}

echo "\n📈 Resumen por tipo de evento:\n";
$summary = DB::table('property_metrics')
    ->select('event_type', DB::raw('COUNT(*) as count'))
    ->groupBy('event_type')
    ->get();

foreach ($summary as $item) {
    echo "- {$item->event_type}: {$item->count} registros\n";
}

echo "\n✅ Base de datos limpia y lista para probar con session_id correcto\n";
echo "🧪 Ahora visita una propiedad para probar el nuevo sistema\n";

?>
