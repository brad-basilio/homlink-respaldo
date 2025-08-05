<?php

require_once 'vendor/autoload.php';

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\PropertyMetricsController;
use Carbon\Carbon;

// Configurar Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

echo "=== TESTING API DASHBOARD DIRECTLY ===\n";

// Crear el controlador
$controller = new PropertyMetricsController();

// Crear un request mock con las fechas que sabemos que tienen datos
$request = new Request([
    'date_from' => '2025-01-01',  // Usar un rango más amplio
    'date_to' => '2025-12-31'
]);

try {
    $response = $controller->getAdminDashboard($request);
    $data = json_decode($response->getContent(), true);
    
    echo "Date range: " . $data['date_range'][0] . " to " . $data['date_range'][1] . "\n\n";
    
    echo "=== MÉTRICAS GLOBALES ===\n";
    $globalMetrics = $data['global_metrics'] ?? [];
    
    foreach (['property_view', 'airbnb_click', 'whatsapp_click'] as $eventType) {
        $count = $globalMetrics[$eventType] ?? 0;
        echo "$eventType: $count\n";
    }
    
    echo "\n=== TOP PROPIEDADES ===\n";
    $topProperties = $data['top_properties'] ?? [];
    
    foreach ($topProperties as $prop) {
        echo "Property ID: " . $prop['property_id'] . " | Views: " . $prop['views_count'] . "\n";
    }
    
    if (empty($topProperties)) {
        echo "No properties found\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
