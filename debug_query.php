<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\PropertyMetric;
use Carbon\Carbon;

echo "=== TESTING EXACT CONTROLLER QUERY ===\n";

// Simular exactamente lo que hace el controlador
$dateFrom = Carbon::now()->subDays(30)->format('Y-m-d');
$dateTo = Carbon::now()->format('Y-m-d');

echo "dateFrom: $dateFrom\n";
echo "dateTo: $dateTo\n\n";

// Query exacta del controlador
$totalViews = PropertyMetric::where('event_type', 'property_view')
    ->whereBetween('created_at', [$dateFrom, $dateTo])
    ->count();

echo "Total views (exacta del controlador): $totalViews\n";

// Vamos a probar diferentes variaciones
echo "\n=== DEBUGGING QUERIES ===\n";

$count1 = PropertyMetric::where('event_type', 'property_view')->count();
echo "Total property_view (sin filtro de fecha): $count1\n";

$count2 = PropertyMetric::where('event_type', 'property_view')
    ->whereDate('created_at', '>=', $dateFrom)
    ->whereDate('created_at', '<=', $dateTo)
    ->count();
echo "Con whereDate: $count2\n";

$count3 = PropertyMetric::where('event_type', 'property_view')
    ->where('created_at', '>=', $dateFrom . ' 00:00:00')
    ->where('created_at', '<=', $dateTo . ' 23:59:59')
    ->count();
echo "Con rangos de tiempo completos: $count3\n";

// Ver qué devuelve exactamente whereBetween
$results = PropertyMetric::where('event_type', 'property_view')
    ->whereBetween('created_at', [$dateFrom, $dateTo])
    ->get(['id', 'created_at']);

echo "\nResultados de whereBetween:\n";
foreach ($results as $result) {
    echo "ID: {$result->id} | Created: {$result->created_at}\n";
}
