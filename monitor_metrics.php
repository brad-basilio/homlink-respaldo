<?php

require_once __DIR__ . '/vendor/autoload.php';

use App\Models\PropertyMetric;

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "🔍 MONITOREO EN TIEMPO REAL DE MÉTRICAS\n";
echo "=====================================\n";
echo "Presiona Ctrl+C para salir\n\n";

$lastCount = 0;

while (true) {
    // Obtener el conteo actual
    $currentCount = PropertyMetric::count();
    
    // Si hay nuevos registros, mostrarlos
    if ($currentCount > $lastCount) {
        $newRecords = PropertyMetric::orderBy('id', 'desc')->take($currentCount - $lastCount)->get();
        
        echo "⚡ NUEVOS REGISTROS DETECTADOS (" . ($currentCount - $lastCount) . "):\n";
        echo "================================================\n";
        
        foreach ($newRecords->reverse() as $record) {
            echo sprintf(
                "[%s] ID: %-3s | Property: %-15s | Event: %-15s | Session: %-25s | IP: %s\n",
                $record->created_at->format('H:i:s'),
                $record->id,
                substr($record->property_id, 0, 8) . '...',
                $record->event_type,
                $record->session_id ?: 'NULL',
                $record->user_ip
            );
        }
        
        echo "\n";
        $lastCount = $currentCount;
    }
    
    // Mostrar estado actual cada 5 segundos
    static $lastStatusTime = 0;
    if (time() - $lastStatusTime >= 5) {
        echo "[" . date('H:i:s') . "] Total registros: $currentCount | Esperando nuevas métricas...\n";
        $lastStatusTime = time();
    }
    
    sleep(1); // Revisar cada segundo
}
