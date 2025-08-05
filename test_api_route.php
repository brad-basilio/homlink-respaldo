<?php

echo "=== PRUEBA DE LA RUTA API ===\n";

// Datos de la petición
$data = [
    'property_id' => '9f855524-9948-4ab1-ada6-2cf04ce709a3',
    'event_type' => 'airbnb_click',
    'metadata' => [
        'test' => 'api_route_test',
        'timestamp' => date('c')
    ]
];

$jsonData = json_encode($data);

echo "🔄 Enviando petición POST a /api/property-metrics/track\n";
echo "📤 Datos: {$jsonData}\n";

// Configurar cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost/api/property-metrics/track');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($jsonData)
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_VERBOSE, true);

// Ejecutar la petición
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);

curl_close($ch);

echo "📥 Respuesta HTTP Code: {$httpCode}\n";

if ($error) {
    echo "❌ Error cURL: {$error}\n";
} else {
    echo "✅ Respuesta: {$response}\n";
}

echo "\n=== FIN DE LA PRUEBA DE RUTA API ===\n";
