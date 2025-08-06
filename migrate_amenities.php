<?php

// Script para migrar amenidades de formato objeto a IDs predefinidos

require_once 'vendor/autoload.php';

use App\Models\Property;
use Illuminate\Support\Facades\Log;

// Cargar configuración
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "=== MIGRACIÓN DE AMENIDADES A IDS ===\n\n";

// Mapeo de nombres a IDs predefinidos
$amenityMapping = [
    'WiFi' => 'wifi',
    'Wifi' => 'wifi',
    'Internet' => 'wifi',
    'TV' => 'tv',
    'Televisor' => 'tv',
    'Television' => 'tv',
    'Cocina' => 'kitchen',
    'Kitchen' => 'kitchen',
    'Lavadora' => 'washing_machine',
    'Washing Machine' => 'washing_machine',
    'Estacionamiento' => 'parking',
    'Parking' => 'parking',
    'Aire acondicionado' => 'air_conditioning',
    'Air Conditioning' => 'air_conditioning',
    'AC' => 'air_conditioning',
    'Calefacción' => 'heating',
    'Heating' => 'heating',
    'Piscina' => 'pool',
    'Pool' => 'pool',
    'Gimnasio' => 'gym',
    'Gym' => 'gym',
    'Balcón' => 'balcony',
    'Balcony' => 'balcony',
    'Jardín' => 'garden',
    'Garden' => 'garden',
    'Pet Friendly' => 'pet_friendly',
    'Mascotas' => 'pet_friendly',
    'Ascensor' => 'elevator',
    'Elevator' => 'elevator',
    'Terraza' => 'terrace',
    'Terrace' => 'terrace',
    'Parrilla' => 'bbq',
    'BBQ' => 'bbq',
    'Barbacoa' => 'bbq',
    'Seguridad' => 'security',
    'Security' => 'security'
];

$serviceMapping = [
    'Limpieza' => 'cleaning',
    'Cleaning' => 'cleaning',
    'Lavandería' => 'laundry',
    'Laundry' => 'laundry',
    'Transporte' => 'transport',
    'Transport' => 'transport',
    'Desayuno' => 'breakfast',
    'Breakfast' => 'breakfast',
    'Conserje' => 'concierge',
    'Concierge' => 'concierge',
    'Compras' => 'grocery',
    'Grocery' => 'grocery',
    'Room Service' => 'room_service',
    'Servicio a la habitación' => 'room_service',
    'Spa' => 'spa',
    'Cuidado de niños' => 'baby_sitting',
    'Baby Sitting' => 'baby_sitting',
    'Guía turístico' => 'tour_guide',
    'Tour Guide' => 'tour_guide',
    'Cocina' => 'cooking',
    'Cooking' => 'cooking',
    'Mantenimiento' => 'maintenance',
    'Maintenance' => 'maintenance'
];

$characteristicMapping = [
    'Moderno' => 'modern',
    'Modern' => 'modern',
    'Lujo' => 'luxury',
    'Luxury' => 'luxury',
    'Histórico' => 'historic',
    'Historic' => 'historic',
    'Vista a la ciudad' => 'city_view',
    'City View' => 'city_view',
    'Vista al mar' => 'ocean_view',
    'Ocean View' => 'ocean_view',
    'Vista a la montaña' => 'mountain_view',
    'Mountain View' => 'mountain_view',
    'Tranquilo' => 'quiet',
    'Quiet' => 'quiet',
    'Central' => 'central',
    'Céntrico' => 'central',
    'Nuevo' => 'new_construction',
    'New' => 'new_construction',
    'Renovado' => 'renovated',
    'Renovated' => 'renovated',
    'Amueblado' => 'furnished',
    'Furnished' => 'furnished',
    'Espacioso' => 'spacious',
    'Spacious' => 'spacious'
];

$ruleMapping = [
    'No mascotas' => 'no_pets',
    'No pets' => 'no_pets',
    'No fumar' => 'no_smoking',
    'No smoking' => 'no_smoking',
    'No fiestas' => 'no_parties',
    'No parties' => 'no_parties',
    'Silencio' => 'quiet_hours',
    'Quiet hours' => 'quiet_hours',
    'Limpio' => 'clean_up',
    'Clean' => 'clean_up',
    'Sin zapatos' => 'no_shoes',
    'No shoes' => 'no_shoes',
    'Check-in' => 'check_in_time',
    'Check-out' => 'check_out_time',
    'Máximo' => 'max_guests',
    'Maximum' => 'max_guests',
    'Registrados' => 'no_unregistered',
    'Registered' => 'no_unregistered',
    'Responsable' => 'responsible_use',
    'Responsible' => 'responsible_use',
    'Reportar' => 'report_issues',
    'Report' => 'report_issues'
];

function findBestMatch($name, $mapping) {
    $name = trim($name);
    
    // Búsqueda exacta
    if (isset($mapping[$name])) {
        return $mapping[$name];
    }
    
    // Búsqueda parcial (case insensitive)
    foreach ($mapping as $key => $value) {
        if (stripos($name, $key) !== false || stripos($key, $name) !== false) {
            return $value;
        }
    }
    
    return null;
}

function migrateProperty($property) {
    global $amenityMapping, $serviceMapping, $characteristicMapping, $ruleMapping;
    
    $updated = false;
    
    echo "Procesando propiedad: {$property->title}\n";
    
    // Migrar amenidades
    if ($property->amenities && is_array($property->amenities)) {
        $newAmenities = [];
        $customAmenities = [];
        
        foreach ($property->amenities as $amenity) {
            if (is_array($amenity) && isset($amenity['name'])) {
                $id = findBestMatch($amenity['name'], $amenityMapping);
                if ($id) {
                    $newAmenities[] = $id;
                    echo "  Amenidad mapeada: {$amenity['name']} -> {$id}\n";
                } else {
                    $customAmenities[] = $amenity;
                    echo "  Amenidad personalizada mantenida: {$amenity['name']}\n";
                }
            } else if (is_string($amenity)) {
                // Ya es un ID, mantenerlo
                $newAmenities[] = $amenity;
            }
        }
        
        if (!empty($newAmenities) || !empty($customAmenities)) {
            $property->amenities = $newAmenities;
            $property->amenities_custom = $customAmenities;
            $updated = true;
        }
    }
    
    // Migrar servicios
    if ($property->services && is_array($property->services)) {
        $newServices = [];
        
        foreach ($property->services as $service) {
            if (is_array($service) && isset($service['name'])) {
                $id = findBestMatch($service['name'], $serviceMapping);
                if ($id) {
                    $newServices[] = $id;
                    echo "  Servicio mapeado: {$service['name']} -> {$id}\n";
                }
            } else if (is_string($service)) {
                $newServices[] = $service;
            }
        }
        
        if (!empty($newServices)) {
            $property->services = $newServices;
            $updated = true;
        }
    }
    
    // Migrar características
    if ($property->characteristics && is_array($property->characteristics)) {
        $newCharacteristics = [];
        
        foreach ($property->characteristics as $characteristic) {
            if (is_array($characteristic) && isset($characteristic['name'])) {
                $id = findBestMatch($characteristic['name'], $characteristicMapping);
                if ($id) {
                    $newCharacteristics[] = $id;
                    echo "  Característica mapeada: {$characteristic['name']} -> {$id}\n";
                }
            } else if (is_string($characteristic)) {
                $newCharacteristics[] = $characteristic;
            }
        }
        
        if (!empty($newCharacteristics)) {
            $property->characteristics = $newCharacteristics;
            $updated = true;
        }
    }
    
    // Migrar reglas
    if ($property->house_rules && is_array($property->house_rules)) {
        $newRules = [];
        
        foreach ($property->house_rules as $rule) {
            if (is_array($rule) && isset($rule['text'])) {
                $id = findBestMatch($rule['text'], $ruleMapping);
                if ($id) {
                    $newRules[] = $id;
                    echo "  Regla mapeada: {$rule['text']} -> {$id}\n";
                }
            } else if (is_string($rule)) {
                $newRules[] = $rule;
            }
        }
        
        if (!empty($newRules)) {
            $property->house_rules = $newRules;
            $updated = true;
        }
    }
    
    if ($updated) {
        $property->save();
        echo "  ✅ Propiedad actualizada\n";
    } else {
        echo "  ➖ Sin cambios necesarios\n";
    }
    
    echo "\n";
    
    return $updated;
}

// Obtener todas las propiedades
$properties = Property::all();
$totalUpdated = 0;

echo "Encontradas {$properties->count()} propiedades para procesar\n\n";

foreach ($properties as $property) {
    if (migrateProperty($property)) {
        $totalUpdated++;
    }
}

echo "=== MIGRACIÓN COMPLETADA ===\n";
echo "Total de propiedades actualizadas: {$totalUpdated}\n";

?>
