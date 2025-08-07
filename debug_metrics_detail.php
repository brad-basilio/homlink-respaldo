<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "🔍 ANÁLISIS DETALLADO DE MÉTRICAS Y PROPIEDADES\n";
echo "==============================================\n\n";

// Ver todos los eventos property_view
echo "📊 TODOS LOS EVENTOS 'property_view':\n";
$propertyViews = DB::table('property_metrics')
    ->where('event_type', 'property_view')
    ->orderBy('created_at', 'desc')
    ->get();

foreach ($propertyViews as $view) {
    echo "- ID Propiedad: {$view->property_id}\n";
    echo "  Fecha: {$view->created_at}\n";
    echo "  Session ID: {$view->session_id}\n\n";
}

// Ver todas las propiedades en el sistema
echo "🏠 TODAS LAS PROPIEDADES EN EL SISTEMA:\n";
$allProperties = DB::table('properties')
    ->select('id', 'title', 'user_id', 'created_at')
    ->get();

foreach ($allProperties as $property) {
    echo "- ID: {$property->id}\n";
    echo "  Título: {$property->title}\n";
    echo "  User ID: {$property->user_id}\n";
    echo "  Creada: {$property->created_at}\n\n";
}

// Comprobar si hay métricas para las propiedades del usuario
echo "🔍 BUSCANDO MÉTRICAS PARA PROPIEDADES DEL USUARIO 1:\n";
$userProperties = DB::table('properties')->where('user_id', 1)->pluck('id');
echo "Propiedades del usuario 1: " . implode(', ', $userProperties->toArray()) . "\n\n";

$metricsForUserProps = DB::table('property_metrics')
    ->whereIn('property_id', $userProperties)
    ->get();

echo "Métricas encontradas para propiedades del usuario: " . count($metricsForUserProps) . "\n";
foreach ($metricsForUserProps as $metric) {
    echo "- Propiedad: {$metric->property_id}\n";
    echo "  Evento: {$metric->event_type}\n";
    echo "  Fecha: {$metric->created_at}\n\n";
}

// Ver qué propiedades tienen métricas
echo "🎯 PROPIEDADES QUE TIENEN MÉTRICAS:\n";
$propertiesWithMetrics = DB::table('property_metrics')
    ->select('property_id', 'event_type', DB::raw('COUNT(*) as count'))
    ->groupBy('property_id', 'event_type')
    ->orderBy('property_id')
    ->get();

foreach ($propertiesWithMetrics as $metric) {
    echo "- Propiedad {$metric->property_id}: {$metric->event_type} = {$metric->count}\n";
}

echo "\n";

// Verificar si las métricas están en las fechas correctas
echo "📅 VERIFICANDO FECHAS DE LAS MÉTRICAS:\n";
$startDate = now()->subDays(30)->format('Y-m-d');
$endDate = now()->format('Y-m-d');
echo "Período: {$startDate} a {$endDate}\n\n";

$recentMetrics = DB::table('property_metrics')
    ->whereBetween('created_at', [$startDate, $endDate])
    ->select('event_type', DB::raw('COUNT(*) as count'))
    ->groupBy('event_type')
    ->get();

echo "Métricas en el período:\n";
foreach ($recentMetrics as $metric) {
    echo "- {$metric->event_type}: {$metric->count}\n";
}

?>
