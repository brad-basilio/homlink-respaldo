<?php
/**
 * Prueba del sistema de métricas con control de sesión
 * Para evitar múltiples conteos de la misma sesión
 */

require_once 'vendor/autoload.php';

echo "🔧 PRUEBA DEL SISTEMA DE MÉTRICAS CON CONTROL DE SESIÓN\n";
echo "==================================================\n\n";

// Configurar la URL base
$baseUrl = 'http://localhost:8000/api';

// Función para hacer peticiones HTTP
function makeRequest($url, $data = null, $method = 'GET') {
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookies.txt'); // Mantener cookies/sesión
    curl_setopt($ch, CURLOPT_COOKIEFILE, 'cookies.txt');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json',
        'X-Requested-With: XMLHttpRequest'
    ]);
    
    if ($method === 'POST' && $data) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [
        'status' => $httpCode,
        'data' => json_decode($response, true)
    ];
}

echo "1️⃣ Obtener información inicial de sesión\n";
$sessionInfo = makeRequest("$baseUrl/property-metrics/session-debug");
echo "Código HTTP: " . $sessionInfo['status'] . "\n";
echo "Respuesta: " . json_encode($sessionInfo['data'], JSON_PRETTY_PRINT) . "\n\n";

echo "2️⃣ Limpiar sesión de métricas (por si hay datos previos)\n";
$clearSession = makeRequest("$baseUrl/property-metrics/clear-session", [], 'POST');
echo "Código HTTP: " . $clearSession['status'] . "\n";
echo "Respuesta: " . json_encode($clearSession['data'], JSON_PRETTY_PRINT) . "\n\n";

echo "3️⃣ Primera vista de propiedad (debería ser registrada)\n";
$firstView = makeRequest("$baseUrl/property-metrics/track", [
    'property_id' => 1,
    'event_type' => 'property_detail_view',
    'metadata' => ['test' => 'first_view']
], 'POST');
echo "Código HTTP: " . $firstView['status'] . "\n";
echo "Respuesta: " . json_encode($firstView['data'], JSON_PRETTY_PRINT) . "\n\n";

echo "4️⃣ Segunda vista de la MISMA propiedad (debería ser ignorada)\n";
$secondView = makeRequest("$baseUrl/property-metrics/track", [
    'property_id' => 1,
    'event_type' => 'property_detail_view',
    'metadata' => ['test' => 'second_view_same_property']
], 'POST');
echo "Código HTTP: " . $secondView['status'] . "\n";
echo "Respuesta: " . json_encode($secondView['data'], JSON_PRETTY_PRINT) . "\n\n";

echo "5️⃣ Vista de DIFERENTE propiedad (debería ser registrada)\n";
$differentProperty = makeRequest("$baseUrl/property-metrics/track", [
    'property_id' => 2,
    'event_type' => 'property_detail_view',
    'metadata' => ['test' => 'different_property']
], 'POST');
echo "Código HTTP: " . $differentProperty['status'] . "\n";
echo "Respuesta: " . json_encode($differentProperty['data'], JSON_PRETTY_PRINT) . "\n\n";

echo "6️⃣ Evento NO controlado por sesión (debería ser registrado siempre)\n";
$uncontrolledEvent = makeRequest("$baseUrl/property-metrics/track", [
    'property_id' => 1,
    'event_type' => 'custom_event',
    'metadata' => ['test' => 'uncontrolled_event']
], 'POST');
echo "Código HTTP: " . $uncontrolledEvent['status'] . "\n";
echo "Respuesta: " . json_encode($uncontrolledEvent['data'], JSON_PRETTY_PRINT) . "\n\n";

echo "7️⃣ Estado final de la sesión\n";
$finalSessionInfo = makeRequest("$baseUrl/property-metrics/session-debug");
echo "Código HTTP: " . $finalSessionInfo['status'] . "\n";
echo "Respuesta: " . json_encode($finalSessionInfo['data'], JSON_PRETTY_PRINT) . "\n\n";

echo "✅ RESUMEN DE LA PRUEBA:\n";
echo "======================\n";
echo "• Primera vista propiedad 1: " . ($firstView['data']['success'] ? "✅ Registrada" : "❌ Error") . "\n";
echo "• Segunda vista propiedad 1: " . ($secondView['data']['duplicated'] ?? false ? "✅ Ignorada (correcto)" : "❌ Registrada (incorrecto)") . "\n";
echo "• Vista propiedad 2: " . ($differentProperty['data']['success'] ? "✅ Registrada" : "❌ Error") . "\n";
echo "• Evento no controlado: " . ($uncontrolledEvent['data']['success'] ? "✅ Registrada" : "❌ Error") . "\n";

// Limpiar archivo de cookies
if (file_exists('cookies.txt')) {
    unlink('cookies.txt');
}

echo "\n🎯 El sistema debe mostrar que la segunda vista de la misma propiedad fue ignorada\n";
echo "   mientras que las otras fueron registradas correctamente.\n";
