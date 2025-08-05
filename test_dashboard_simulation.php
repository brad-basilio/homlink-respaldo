<?php

require_once 'vendor/autoload.php';

// Configurar el entorno Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\PropertyMetric;
use App\Models\Property;
use Carbon\Carbon;

header('Content-Type: application/json');

echo "Testing direct dashboard API simulation..." . PHP_EOL;

try {
    // Simular el mismo procesamiento que hace el controlador
    $dateFrom = Carbon::now()->subDays(30)->startOfDay();
    $dateTo = Carbon::now()->endOfDay();

    echo "Date range: {$dateFrom->format('Y-m-d')} to {$dateTo->format('Y-m-d')}" . PHP_EOL;

    // Métricas globales agrupadas por tipo de evento
    $globalMetrics = PropertyMetric::selectRaw('event_type, COUNT(*) as count')
        ->whereBetween('created_at', [$dateFrom, $dateTo])
        ->groupBy('event_type')
        ->get()
        ->pluck('count', 'event_type')
        ->toArray();

    echo "Global metrics raw: " . json_encode($globalMetrics) . PHP_EOL;

    // Top propiedades
    $topProperties = PropertyMetric::select('property_id')
        ->selectRaw('COUNT(*) as views_count')
        ->where('event_type', 'property_view')
        ->whereBetween('created_at', [$dateFrom, $dateTo])
        ->groupBy('property_id')
        ->orderBy('views_count', 'desc')
        ->limit(10)
        ->with('property')
        ->get();

    echo "Top properties count: " . $topProperties->count() . PHP_EOL;

    // Simular respuesta JSON
    $response = [
        'global_metrics' => $globalMetrics,
        'top_properties' => $topProperties->toArray(),
        'top_users' => [],
        'date_range' => [$dateFrom->format('Y-m-d'), $dateTo->format('Y-m-d')]
    ];

    echo PHP_EOL . "Final JSON response:" . PHP_EOL;
    echo json_encode($response, JSON_PRETTY_PRINT) . PHP_EOL;

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . PHP_EOL;
}
