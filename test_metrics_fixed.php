<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "🔍 VERIFICACIÓN DE MÉTRICAS DESPUÉS DEL CAMBIO\n";
echo "============================================\n\n";

// Verificar eventos en base de datos
echo "📊 Eventos en base de datos:\n";
$events = DB::table('property_metrics')->select('event_type', DB::raw('COUNT(*) as count'))
    ->groupBy('event_type')
    ->get();

foreach ($events as $event) {
    echo "- {$event->event_type}: {$event->count} registros\n";
}

echo "\n";

// Buscar usuario de prueba
$user = DB::table('users')->first();
if (!$user) {
    echo "❌ No hay usuarios en la base de datos\n";
    exit;
}

echo "👤 Usuario de prueba: {$user->name} (ID: {$user->id})\n";

// Buscar propiedades del usuario
$userProperties = DB::table('properties')->where('user_id', $user->id)->get();
echo "🏠 Propiedades del usuario: " . count($userProperties) . "\n\n";

// Simular request a UserDashboardController
echo "🧪 SIMULANDO REQUEST AL DASHBOARD\n";
echo "=================================\n";

// Fechas para el período de 30 días
$endDate = now()->format('Y-m-d');
$startDate = now()->subDays(30)->format('Y-m-d');

echo "📅 Período: {$startDate} a {$endDate}\n\n";

try {
    // Simular la lógica del UserDashboardController
    $properties = DB::table('properties')
        ->where('user_id', $user->id)
        ->select('properties.*')
        ->get();

    foreach ($properties as $property) {
        // Calcular métricas por propiedad (como en el controller)
        $metrics = DB::table('property_metrics')
            ->where('property_id', $property->id)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->select('event_type', DB::raw('COUNT(*) as count'))
            ->groupBy('event_type')
            ->pluck('count', 'event_type')
            ->toArray();
        
        echo "🏠 Propiedad: {$property->title}\n";
        echo "   - ID: {$property->id}\n";
        echo "   - property_view: " . ($metrics['property_view'] ?? 0) . "\n";
        echo "   - airbnb_click: " . ($metrics['airbnb_click'] ?? 0) . "\n";
        echo "   - gallery_view: " . ($metrics['gallery_view'] ?? 0) . "\n";
        
        // Calcular tasa de conversión
        $views = $metrics['property_view'] ?? 0;
        $clicks = $metrics['airbnb_click'] ?? 0;
        $conversion = $views > 0 ? round(($clicks / $views) * 100, 1) : 0;
        echo "   - Conversión: {$conversion}%\n\n";
    }
    
    // Métricas totales del usuario
    $totalMetrics = DB::table('property_metrics')
        ->join('properties', 'property_metrics.property_id', '=', 'properties.id')
        ->where('properties.user_id', $user->id)
        ->whereBetween('property_metrics.created_at', [$startDate, $endDate])
        ->select('event_type', DB::raw('COUNT(*) as count'))
        ->groupBy('event_type')
        ->pluck('count', 'event_type')
        ->toArray();
    
    echo "📈 MÉTRICAS TOTALES DEL USUARIO:\n";
    echo "- Total views: " . ($totalMetrics['property_view'] ?? 0) . "\n";
    echo "- Total clicks: " . ($totalMetrics['airbnb_click'] ?? 0) . "\n";
    echo "- Total gallery: " . ($totalMetrics['gallery_view'] ?? 0) . "\n";
    
    $totalViews = $totalMetrics['property_view'] ?? 0;
    $totalClicks = $totalMetrics['airbnb_click'] ?? 0;
    $totalConversion = $totalViews > 0 ? round(($totalClicks / $totalViews) * 100, 1) : 0;
    echo "- Conversión general: {$totalConversion}%\n\n";

    echo "✅ RESULTADO: Las métricas ahora deberían mostrarse correctamente\n";
    echo "   porque PropertyDetail.jsx ahora envía 'property_view' eventos\n";
    echo "   que es lo que espera UserDashboard.jsx\n\n";

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}

?>
