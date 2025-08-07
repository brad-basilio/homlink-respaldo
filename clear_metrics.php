<?php
require_once 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$host = $_ENV['DB_HOST'];
$db = $_ENV['DB_DATABASE'];
$user = $_ENV['DB_USERNAME'];
$pass = $_ENV['DB_PASSWORD'];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "🗑️ Limpiando métricas existentes...\n";
    $stmt = $pdo->prepare('DELETE FROM property_metrics');
    $stmt->execute();
    
    echo "✅ Métricas limpiadas. Total eliminadas: " . $stmt->rowCount() . "\n";
    echo "📊 Métricas actuales en base de datos: ";
    
    $countStmt = $pdo->query('SELECT COUNT(*) FROM property_metrics');
    echo $countStmt->fetchColumn() . "\n";
    
    echo "🎯 Base de datos lista para testing\n";
    
} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
