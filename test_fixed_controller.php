<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\PropertyMetric;
use Carbon\Carbon;

echo "=== TESTING FIXED CONTROLLER QUERY ===\n";

$dateFrom = Carbon::now()->subDays(30)->toDateString();
$dateTo = Carbon::now()->toDateString();

// Convertir fechas a rangos completos con hora
$dateFromFull = Carbon::parse($dateFrom)->startOfDay();
$dateToFull = Carbon::parse($dateTo)->endOfDay();

echo "dateFrom: $dateFrom -> $dateFromFull\n";
echo "dateTo: $dateTo -> $dateToFull\n\n";

// Métricas globales agrupadas por tipo de evento
$globalMetrics = PropertyMetric::selectRaw('event_type, COUNT(*) as count')
    ->whereBetween('created_at', [$dateFromFull, $dateToFull])
    ->groupBy('event_type')
    ->get()
    ->pluck('count', 'event_type')
    ->toArray();

echo "=== MÉTRICAS GLOBALES ===\n";
foreach ($globalMetrics as $event => $count) {
    echo "$event: $count\n";
}

// Top propiedades
$topProperties = PropertyMetric::select('property_id')
    ->selectRaw('COUNT(*) as views_count')
    ->where('event_type', 'property_view')
    ->whereBetween('created_at', [$dateFromFull, $dateToFull])
    ->groupBy('property_id')
    ->orderBy('views_count', 'desc')
    ->limit(5)
    ->get();

echo "\n=== TOP PROPIEDADES ===\n";
foreach ($topProperties as $prop) {
    echo "Property ID: {$prop->property_id} | Views: {$prop->views_count}\n";
}
