<?php

require 'vendor/autoload.php';
require 'bootstrap/app.php';

$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Property;

echo "=== VERIFICANDO DATOS DE PROPIEDADES ===\n\n";

$properties = Property::take(3)->get();

if ($properties->count() === 0) {
    echo "No hay propiedades en la base de datos.\n";
    exit;
}

foreach ($properties as $property) {
    echo "ID: {$property->id}\n";
    echo "Título: {$property->title}\n";
    echo "Slug: {$property->slug}\n";
    echo "Amenidades: " . json_encode($property->amenities, JSON_PRETTY_PRINT) . "\n";
    echo "Servicios: " . json_encode($property->services, JSON_PRETTY_PRINT) . "\n";
    echo "Características: " . json_encode($property->characteristics, JSON_PRETTY_PRINT) . "\n";
    echo "Reglas de casa: " . json_encode($property->house_rules, JSON_PRETTY_PRINT) . "\n";
    echo "URL: /property/{$property->slug}\n";
    echo str_repeat("-", 50) . "\n\n";
}
