<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\PropertyMetric;

echo "=== DEBUG MÉTRICAS ===\n";

// Total de registros
$total = PropertyMetric::count();
echo "Total registros: $total\n\n";

// Últimos 5 registros
echo "Últimos 5 registros:\n";
$latest = PropertyMetric::latest()->take(5)->get();
foreach ($latest as $metric) {
    echo "ID: {$metric->id} | Event: {$metric->event_type} | Property: {$metric->property_id} | Created: {$metric->created_at}\n";
}

echo "\n=== CONTEO POR TIPO DE EVENTO ===\n";
$counts = PropertyMetric::selectRaw('event_type, COUNT(*) as count')
    ->groupBy('event_type')
    ->get();
    
foreach ($counts as $count) {
    echo "{$count->event_type}: {$count->count}\n";
}

echo "\n=== REGISTROS DE HOY ===\n";
$today = PropertyMetric::whereDate('created_at', today())->count();
echo "Registros de hoy: $today\n";

echo "\n=== REGISTROS CON TIMESTAMPS NULOS ===\n";
$nullTimestamps = PropertyMetric::whereNull('created_at')->count();
echo "Registros con created_at NULL: $nullTimestamps\n";
