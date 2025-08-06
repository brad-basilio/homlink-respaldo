<?php

require 'vendor/autoload.php';

$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;

$columns = Schema::getColumnListing('properties');

echo "Columnas de la tabla properties:\n";
foreach($columns as $col) {
    echo "- $col\n";
}

echo "\nInfo adicional:\n";
echo "- Total columnas: " . count($columns) . "\n";
echo "- Tiene 'status': " . (in_array('status', $columns) ? 'SÍ' : 'NO') . "\n";
echo "- Tiene 'active': " . (in_array('active', $columns) ? 'SÍ' : 'NO') . "\n";

?>
