<?php
// Conectar a la base de datos usando PDO directamente
try {
    $pdo = new PDO('mysql:host=localhost;dbname=homlink_db', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "=== PROPIEDADES CON EXTERNAL_LINK ===\n";
    
    $stmt = $pdo->prepare("SELECT id, title, slug, external_link FROM properties WHERE external_link IS NOT NULL LIMIT 5");
    $stmt->execute();
    $properties = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if ($properties) {
        foreach ($properties as $property) {
            echo "ID: {$property['id']}\n";
            echo "Title: {$property['title']}\n"; 
            echo "Slug: {$property['slug']}\n";
            echo "External Link: " . substr($property['external_link'], 0, 80) . "...\n";
            echo "URL to test: http://localhost/property/{$property['slug']}\n";
            echo "---\n";
        }
    } else {
        echo "No hay propiedades con external_link configurado.\n";
    }
    
    echo "\n=== TOTAL DE PROPIEDADES ===\n";
    $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM properties");
    $stmt->execute();
    $total = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "Total de propiedades: {$total['total']}\n";
    
    $stmt = $pdo->prepare("SELECT COUNT(*) as total_with_external FROM properties WHERE external_link IS NOT NULL");
    $stmt->execute();
    $totalWithExternal = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "Total con external_link: {$totalWithExternal['total_with_external']}\n";
    
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage() . "\n";
}
?>
