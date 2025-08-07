<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "📋 ESTRUCTURA DE LA TABLA property_metrics:\n";
echo "==========================================\n";

$columns = DB::select('DESCRIBE property_metrics');
foreach($columns as $col) {
    echo sprintf("%-15s | %-20s | %-5s | %-10s\n", 
        $col->Field, 
        $col->Type, 
        $col->Null, 
        $col->Default ?? 'NULL'
    );
}

echo "\n🔍 VERIFICANDO DATOS ACTUALES:\n";
echo "==============================\n";

$sampleData = DB::table('property_metrics')->limit(3)->get();
foreach($sampleData as $row) {
    echo "ID: {$row->id} | Event: {$row->event_type} | Session ID: " . ($row->session_id ?? 'NULL') . "\n";
}

?>
