<?php

require 'vendor/autoload.php';

$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Property;
use Illuminate\Support\Facades\Schema;

echo "=== PRUEBA DE ELIMINACIÓN ===\n\n";

// Obtener una propiedad de prueba
$property = Property::first();

if ($property) {
    echo "Propiedad encontrada:\n";
    echo "- ID: {$property->id}\n";
    echo "- Título: {$property->title}\n";
    echo "- Activa: " . ($property->active ? 'SÍ' : 'NO') . "\n\n";
    
    echo "Verificando estructura de tabla:\n";
    $table = $property->getTable();
    echo "- Tabla: {$table}\n";
    echo "- Tiene columna 'status': " . (Schema::hasColumn($table, 'status') ? 'SÍ' : 'NO') . "\n";
    echo "- Tiene columna 'active': " . (Schema::hasColumn($table, 'active') ? 'SÍ' : 'NO') . "\n\n";
    
    echo "El BasicController debería:\n";
    if (Schema::hasColumn($table, 'status')) {
        echo "- Hacer soft delete (status = false)\n";
    } else {
        echo "- Hacer delete real (eliminar registro completamente)\n";
    }
    
} else {
    echo "No se encontraron propiedades para probar.\n";
}

echo "\n=== FIN DE LA PRUEBA ===\n";

?>
