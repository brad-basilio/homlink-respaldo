<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Property;
use App\Models\PropertyMetric;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

echo "=== DEBUGGING USER METRICS QUERY ===\n";

$user = User::find(4); // Brad
Auth::login($user);

$startDate = '2025-07-01';
$endDate = '2025-08-07';

echo "📅 Rango de fechas: {$startDate} - {$endDate}\n";

// Obtener propiedades del usuario
$properties = Property::where('user_id', $user->id)->get();
echo "🏠 Propiedades del usuario: " . $properties->count() . "\n";

// Verificar métricas por propiedad
foreach ($properties as $property) {
    echo "\n🔍 Propiedad: {$property->title} (ID: {$property->id})\n";
    
    // Métricas sin filtro de fecha
    $allMetrics = PropertyMetric::where('property_id', $property->id)->get();
    echo "  📊 Total métricas (sin filtro): " . $allMetrics->count() . "\n";
    
    if ($allMetrics->count() > 0) {
        foreach ($allMetrics as $metric) {
            echo "    - {$metric->event_type}: {$metric->created_at}\n";
        }
    }
    
    // Métricas con filtro de fecha
    $filteredMetrics = PropertyMetric::where('property_id', $property->id)
        ->whereBetween('created_at', [$startDate, $endDate])
        ->get();
    echo "  📅 Métricas en rango: " . $filteredMetrics->count() . "\n";
    
    if ($filteredMetrics->count() > 0) {
        foreach ($filteredMetrics as $metric) {
            echo "    - {$metric->event_type}: {$metric->created_at}\n";
        }
    }
}

echo "\n=== QUERY DIRECTA ===\n";

// Query directa como la del controlador
$properties = Property::where('user_id', $user->id)
    ->with(['metrics' => function ($query) use ($startDate, $endDate) {
        $query->whereBetween('created_at', [$startDate, $endDate]);
    }])
    ->get();

foreach ($properties as $property) {
    $metrics = $property->metrics->groupBy('event_type')->map->count();
    echo "🏠 {$property->title}: ";
    echo "Views: " . $metrics->get('property_view', 0) . ", ";
    echo "Clicks: " . $metrics->get('airbnb_click', 0) . ", ";
    echo "Gallery: " . $metrics->get('gallery_view', 0) . "\n";
}
