<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=homlink_db', 'root', '', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    
    echo "=== EVENTOS REALES EN LA BASE DE DATOS ===\n\n";
    
    $result = $pdo->query('SELECT DISTINCT event_type, COUNT(*) as count FROM property_metrics GROUP BY event_type ORDER BY count DESC');
    
    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        echo "- {$row['event_type']}: {$row['count']} registros\n";
    }
    
    echo "\n=== MUESTRA DE DATOS RECIENTES ===\n\n";
    
    $result2 = $pdo->query('SELECT event_type, property_id, created_at FROM property_metrics ORDER BY created_at DESC LIMIT 10');
    
    while($row = $result2->fetch(PDO::FETCH_ASSOC)) {
        echo "- {$row['event_type']} | Propiedad: {$row['property_id']} | {$row['created_at']}\n";
    }
    
} catch(Exception $e) {
    echo 'Error: ' . $e->getMessage() . "\n";
}
?>
