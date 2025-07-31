<?php

require 'vendor/autoload.php';
require 'bootstrap/app.php';

use App\Models\Property;

$property = Property::find('9f855524-9948-4ab1-ada6-2cf04ce709a3');

if ($property) {
    echo "Property found!\n";
    echo "Department: " . $property->department . "\n";
    echo "Province: " . $property->province . "\n";
    echo "District: " . $property->district . "\n";
    echo "Gallery count: " . count($property->gallery ?? []) . "\n";
    echo "Amenities count: " . count($property->amenities ?? []) . "\n";
    echo "Services count: " . count($property->services ?? []) . "\n";
    echo "Characteristics count: " . count($property->characteristics ?? []) . "\n";
    echo "House rules count: " . count($property->house_rules ?? []) . "\n";
    echo "Main image: " . $property->main_image . "\n";
    echo "Created at: " . $property->created_at . "\n";
    echo "Updated at: " . $property->updated_at . "\n";
} else {
    echo "Property not found!\n";
}
