<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "=== PROBANDO USER DASHBOARD METRICS API ===\n";

// Simular una petición a la API
echo "🔍 Probando endpoint: /api/user-dashboard-metrics\n";

// Simular autenticación del usuario que tiene métricas (Brad, ID: 4)
use App\Models\User;
use Illuminate\Support\Facades\Auth;

$user = User::find(4); // Usuario Brad que tiene la propiedad con métricas
if (!$user) {
    echo "❌ Usuario Brad (ID: 4) no encontrado\n";
    exit;
}

echo "👤 Usuario encontrado: {$user->name} (ID: {$user->id})\n";

// Simular login
Auth::login($user);

// Crear una instancia del controlador y llamar al método
use App\Http\Controllers\UserDashboardController;
use Illuminate\Http\Request;

$controller = new UserDashboardController();
$request = new Request([
    'start_date' => '2025-07-01',
    'end_date' => '2025-08-07'
]);

try {
    $response = $controller->getUserMetrics($request);
    $data = $response->getData(true);
    
    echo "✅ Respuesta de la API:\n";
    echo json_encode($data, JSON_PRETTY_PRINT) . "\n";
    
    echo "\n📊 Resumen:\n";
    echo "- Propiedades encontradas: " . count($data['properties']) . "\n";
    echo "- Total vistas: " . ($data['total_metrics']['property_view'] ?? 0) . "\n";
    echo "- Total clicks: " . ($data['total_metrics']['airbnb_click'] ?? 0) . "\n";
    echo "- Total galería: " . ($data['total_metrics']['gallery_view'] ?? 0) . "\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "📍 Archivo: " . $e->getFile() . ":" . $e->getLine() . "\n";
}
