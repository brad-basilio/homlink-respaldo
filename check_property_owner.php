<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Property;
use App\Models\PropertyMetric;
use App\Models\User;

echo "=== VERIFICANDO PROPIEDAD DE PRUEBAS ===\n";

$testPropertyId = '9f91adea-eb98-480b-b1ef-4f0c5e380511';
$property = Property::find($testPropertyId);

if ($property) {
    echo "Propiedad encontrada: " . $property->title . "\n";
    echo "ID: " . $property->id . "\n";
    echo "Usuario ID: " . $property->user_id . "\n";
    
    $user = User::find($property->user_id);
    if ($user) {
        echo "Usuario propietario: " . $user->name . "\n";
        echo "Email: " . $user->email . "\n";
    }
    
    $metrics = PropertyMetric::where('property_id', $testPropertyId)->get();
    echo "Métricas encontradas: " . $metrics->count() . "\n";
    
    foreach ($metrics as $metric) {
        echo "- " . $metric->event_type . " (ID: " . $metric->id . ", Session: " . $metric->session_id . ")\n";
    }
} else {
    echo "Propiedad no encontrada\n";
}

echo "\n=== USUARIOS DISPONIBLES ===\n";
$users = User::all();
foreach ($users as $user) {
    $propertiesCount = Property::where('user_id', $user->id)->count();
    echo "- ID: {$user->id}, Nombre: {$user->name}, Email: {$user->email}, Propiedades: {$propertiesCount}\n";
}
