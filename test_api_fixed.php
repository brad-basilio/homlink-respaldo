<?php

require_once 'vendor/autoload.php';

// Inicializar Laravel correctamente
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

use App\Models\PropertyMetric;
use Carbon\Carbon;

echo "=== TESTING API DASHBOARD FIXED ===\n";

// Configurar fechas de prueba
$dateFrom = '2025-01-01';
$dateTo = '2025-12-31';

echo "Date range: $dateFrom to $dateTo\n\n";

// Convertir fechas a rangos completos con hora
$dateFromFull = Carbon::parse($dateFrom)->startOfDay();
$dateToFull = Carbon::parse($dateTo)->endOfDay();

echo "Parsed dates: {$dateFromFull} to {$dateToFull}\n\n";

try {
    // Métricas globales agrupadas por tipo de evento
    $globalMetrics = PropertyMetric::selectRaw('event_type, COUNT(*) as count')
        ->whereBetween('created_at', [$dateFromFull, $dateToFull])
        ->groupBy('event_type')
        ->get()
        ->pluck('count', 'event_type')
        ->toArray();

    echo "=== MÉTRICAS GLOBALES ===\n";
    foreach (['property_view', 'airbnb_click', 'whatsapp_click'] as $eventType) {
        $count = $globalMetrics[$eventType] ?? 0;
        echo "$eventType: $count\n";
    }

    // Top propiedades
    $topProperties = PropertyMetric::select('property_id')
        ->selectRaw('COUNT(*) as views_count')
        ->where('event_type', 'property_view')
        ->whereBetween('created_at', [$dateFromFull, $dateToFull])
        ->groupBy('property_id')
        ->orderBy('views_count', 'desc')
        ->limit(10)
        ->get();

    echo "\n=== TOP PROPIEDADES ===\n";
    foreach ($topProperties as $prop) {
        echo "Property ID: " . $prop['property_id'] . " | Views: " . $prop['views_count'] . "\n";
    }
    
    if ($topProperties->isEmpty()) {
        echo "No properties found\n";
    }

    // Verificar todos los registros sin filtro de fecha
    echo "\n=== VERIFICACIÓN SIN FILTRO DE FECHA ===\n";
    $allMetrics = PropertyMetric::selectRaw('event_type, COUNT(*) as count')
        ->groupBy('event_type')
        ->get()
        ->pluck('count', 'event_type')
        ->toArray();
    
    foreach (['property_view', 'airbnb_click', 'whatsapp_click'] as $eventType) {
        $count = $allMetrics[$eventType] ?? 0;
        echo "Total $eventType: $count\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
