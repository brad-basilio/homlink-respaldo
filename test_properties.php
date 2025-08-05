<?php
require_once 'vendor/autoload.php';
require_once 'bootstrap/app.php';

use App\Models\Property;

echo "Properties with external_link:\n";
$properties = Property::whereNotNull('external_link')->take(5)->get(['id', 'title', 'slug', 'external_link']);

foreach ($properties as $property) {
    echo "ID: {$property->id} - Title: {$property->title} - Slug: {$property->slug}\n";
    echo "External Link: " . substr($property->external_link, 0, 80) . "\n";
    echo "URL to test: http://localhost/property/{$property->slug}\n\n";
}

echo "Total properties with external_link: " . Property::whereNotNull('external_link')->count() . "\n";
