<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\PropertyMetric;
use Carbon\Carbon;

echo "=== TESTING DASHBOARD ENDPOINT ===\n";

$dateFrom = Carbon::now()->subDays(30)->format('Y-m-d');
$dateTo = Carbon::now()->format('Y-m-d');

echo "Date range: $dateFrom to $dateTo\n\n";

// Métricas generales
$totalViews = PropertyMetric::where('event_type', 'property_view')
    ->whereBetween('created_at', [$dateFrom, $dateTo])
    ->count();

$totalClicks = PropertyMetric::where('event_type', 'airbnb_click')
    ->whereBetween('created_at', [$dateFrom, $dateTo])
    ->count();

$totalWhatsApp = PropertyMetric::where('event_type', 'whatsapp_click')
    ->whereBetween('created_at', [$dateFrom, $dateTo])
    ->count();

echo "=== MÉTRICAS GLOBALES ===\n";
echo "Visualizaciones (property_view): $totalViews\n";
echo "Clicks Airbnb (airbnb_click): $totalClicks\n";
echo "Clicks WhatsApp (whatsapp_click): $totalWhatsApp\n";

$conversionRate = $totalViews > 0 ? round(($totalClicks / $totalViews) * 100, 2) : 0;
echo "Tasa de conversión: $conversionRate%\n\n";

// Top propiedades
echo "=== TOP PROPIEDADES ===\n";
$topProperties = PropertyMetric::select('property_id')
    ->selectRaw('COUNT(*) as views_count')
    ->where('event_type', 'property_view')
    ->whereBetween('created_at', [$dateFrom, $dateTo])
    ->groupBy('property_id')
    ->orderBy('views_count', 'desc')
    ->limit(5)
    ->get();

foreach ($topProperties as $prop) {
    echo "Property ID: {$prop->property_id} | Views: {$prop->views_count}\n";
}
