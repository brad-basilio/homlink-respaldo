<?php

use Illuminate\Support\Facades\DB;

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "=== PROPERTY METRICS TABLE ===\n";
$metrics = DB::table('property_metrics')->get();
echo "Total registros: " . $metrics->count() . "\n\n";

if ($metrics->count() > 0) {
    foreach ($metrics as $metric) {
        echo "ID: " . $metric->id . "\n";
        echo "Property: " . $metric->property_id . "\n";
        echo "Event: " . $metric->event_type . "\n";
        echo "Session ID: " . $metric->session_id . "\n";
        echo "Created: " . $metric->created_at . "\n";
        echo "-------------------\n";
    }
} else {
    echo "NO HAY REGISTROS EN property_metrics\n";
}

echo "\n=== SESSIONS RECIENTES ===\n";
$sessions = DB::table('sessions')->orderBy('last_activity', 'desc')->limit(5)->get();
foreach ($sessions as $session) {
    echo "ID: " . $session->id . "\n";
    echo "User ID: " . ($session->user_id ?? 'guest') . "\n";
    echo "Last Activity: " . date('Y-m-d H:i:s', $session->last_activity) . "\n";
    echo "---\n";
}
