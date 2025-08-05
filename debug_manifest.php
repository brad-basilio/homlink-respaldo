<?php
// Archivo de debug para verificar el manifest en el servidor
echo "<h2>Debug Manifest PropertyMetrics</h2>";

echo "<h3>1. Verificar si existe el manifest.json</h3>";
$manifestPath = public_path('build/manifest.json');
if (file_exists($manifestPath)) {
    echo "✅ Manifest existe en: " . $manifestPath . "<br>";
    echo "📅 Última modificación: " . date('Y-m-d H:i:s', filemtime($manifestPath)) . "<br>";
    echo "📊 Tamaño: " . number_format(filesize($manifestPath)) . " bytes<br>";
} else {
    echo "❌ Manifest NO existe en: " . $manifestPath . "<br>";
}

echo "<h3>2. Verificar contenido del manifest</h3>";
if (file_exists($manifestPath)) {
    $manifest = json_decode(file_get_contents($manifestPath), true);
    
    if (isset($manifest['resources/js/Admin/PropertyMetrics.jsx'])) {
        echo "✅ PropertyMetrics encontrado en manifest:<br>";
        echo "<pre>" . json_encode($manifest['resources/js/Admin/PropertyMetrics.jsx'], JSON_PRETTY_PRINT) . "</pre>";
        
        // Verificar si el archivo JS existe
        $jsFile = public_path('build/' . $manifest['resources/js/Admin/PropertyMetrics.jsx']['file']);
        if (file_exists($jsFile)) {
            echo "✅ Archivo JS existe: " . $jsFile . "<br>";
            echo "📊 Tamaño JS: " . number_format(filesize($jsFile)) . " bytes<br>";
        } else {
            echo "❌ Archivo JS NO existe: " . $jsFile . "<br>";
        }
    } else {
        echo "❌ PropertyMetrics NO encontrado en manifest<br>";
        
        // Buscar claves similares
        echo "<h4>Claves similares encontradas:</h4>";
        foreach ($manifest as $key => $value) {
            if (stripos($key, 'propertymetrics') !== false || stripos($key, 'metrics') !== false) {
                echo "🔍 " . $key . "<br>";
            }
        }
    }
} else {
    echo "❌ No se puede leer el manifest<br>";
}

echo "<h3>3. Verificar directorio build</h3>";
$buildPath = public_path('build');
if (is_dir($buildPath)) {
    echo "✅ Directorio build existe<br>";
    $files = scandir($buildPath);
    $jsFiles = array_filter($files, function($file) {
        return strpos($file, 'PropertyMetrics') !== false;
    });
    
    if (!empty($jsFiles)) {
        echo "✅ Archivos PropertyMetrics encontrados:<br>";
        foreach ($jsFiles as $file) {
            echo "📄 " . $file . "<br>";
        }
    } else {
        echo "❌ No se encontraron archivos PropertyMetrics en build/<br>";
    }
} else {
    echo "❌ Directorio build no existe<br>";
}

echo "<h3>4. Verificar Laravel Vite Helper</h3>";
try {
    // Intentar usar el helper de Vite
    $viteAsset = \Illuminate\Support\Facades\Vite::asset('resources/js/Admin/PropertyMetrics.jsx');
    echo "✅ Vite helper funciona: " . $viteAsset . "<br>";
} catch (Exception $e) {
    echo "❌ Error con Vite helper: " . $e->getMessage() . "<br>";
}

echo "<h3>5. Info del sistema</h3>";
echo "🌐 Environment: " . app()->environment() . "<br>";
echo "🔧 Debug mode: " . (config('app.debug') ? 'ON' : 'OFF') . "<br>";
echo "⏰ Fecha actual: " . now() . "<br>";

?>
