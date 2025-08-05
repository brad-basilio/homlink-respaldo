<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\PropertyMetric;

echo "=== FECHAS DE REGISTROS ===\n";

$metrics = PropertyMetric::all(['id', 'created_at', 'event_type']);
foreach ($metrics as $metric) {
    echo "ID: {$metric->id} | Event: {$metric->event_type} | Created: {$metric->created_at}\n";
}

echo "\n=== ANÁLISIS DE FECHAS ===\n";
echo "Fecha/hora actual: " . now() . "\n";
echo "Fecha de hoy: " . today() . "\n";
echo "30 días atrás: " . now()->subDays(30) . "\n";
