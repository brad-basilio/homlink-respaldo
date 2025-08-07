<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

echo "=== PRUEBA DEL SISTEMA DE MÉTRICAS CORREGIDO ===\n\n";

// Simular una petición POST al endpoint
echo "1. 🧪 Simulando petición al endpoint de métricas...\n";

// Crear datos de prueba como los que envía el frontend
$testData = [
    'property_id' => '9f91adea-eb98-480b-b1ef-4f0c5e380511',
    'event_type' => 'property_view',
    'session_id' => 'session_test_' . time() . '_' . substr(md5(rand()), 0, 8),
    'metadata' => [
        'page' => 'property_detail',
        'title' => 'Test Property',
        'session_controlled' => true,
        'timestamp' => now()->toISOString(),
        'test' => true
    ]
];

echo "📦 Datos de prueba:\n";
echo "   - Property ID: " . $testData['property_id'] . "\n";
echo "   - Event Type: " . $testData['event_type'] . "\n";
echo "   - Session ID: " . $testData['session_id'] . "\n\n";

// Verificar que no hay métricas antes
$beforeCount = DB::table('property_metrics')->count();
echo "2. 📊 Métricas antes de la prueba: $beforeCount\n\n";

// Simular la petición usando curl al localhost
echo "3. 🚀 Enviando petición al endpoint...\n";

$url = 'http://localhost:8000/api/property-metrics/track';
$postData = json_encode($testData);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($postData),
    'User-Agent: Test-Script/1.0'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "📡 Respuesta HTTP: $httpCode\n";
if ($error) {
    echo "❌ Error cURL: $error\n";
} else {
    echo "📋 Respuesta del servidor:\n";
    echo $response . "\n";
}

echo "\n4. 📊 Verificando base de datos después de la petición...\n";
$afterCount = DB::table('property_metrics')->count();
echo "   - Métricas después: $afterCount\n";

if ($afterCount > $beforeCount) {
    echo "✅ ¡Métrica registrada exitosamente!\n";
    
    // Mostrar la métrica guardada
    $metric = DB::table('property_metrics')->latest()->first();
    if ($metric) {
        echo "\n📋 Datos de la métrica guardada:\n";
        echo "   - ID: " . $metric->id . "\n";
        echo "   - Property ID: " . $metric->property_id . "\n";
        echo "   - Event Type: " . $metric->event_type . "\n";
        echo "   - Session ID: " . $metric->session_id . "\n";
        echo "   - Created: " . $metric->created_at . "\n";
        echo "   - Metadata: " . ($metric->metadata ?? 'null') . "\n";
    }
} else {
    echo "❌ No se registró la métrica en la base de datos\n";
}

echo "\n5. 🔄 Probando protección anti-duplicados...\n";
echo "   Enviando la misma petición otra vez...\n";

// Enviar la misma petición
$ch2 = curl_init();
curl_setopt($ch2, CURLOPT_URL, $url);
curl_setopt($ch2, CURLOPT_POST, 1);
curl_setopt($ch2, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch2, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($postData),
    'User-Agent: Test-Script/1.0'
]);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

$response2 = curl_exec($ch2);
$httpCode2 = curl_getinfo($ch2, CURLINFO_HTTP_CODE);
curl_close($ch2);

echo "📡 Segunda respuesta HTTP: $httpCode2\n";
echo "📋 Segunda respuesta:\n";
echo $response2 . "\n";

$finalCount = DB::table('property_metrics')->count();
echo "\n📊 Métricas finales: $finalCount\n";

if ($finalCount == $afterCount) {
    echo "✅ ¡Protección anti-duplicados funcionando correctamente!\n";
} else {
    echo "❌ Se creó un duplicado - la protección falló\n";
}

echo "\n=== RESUMEN DE LA PRUEBA ===\n";
echo "- Métricas iniciales: $beforeCount\n";
echo "- Métricas después de 1ra petición: $afterCount\n";
echo "- Métricas después de 2da petición: $finalCount\n";
echo "- Sistema funcionando: " . ($finalCount == $afterCount && $afterCount > $beforeCount ? "✅ SÍ" : "❌ NO") . "\n";
