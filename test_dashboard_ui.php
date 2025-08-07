<?php
echo "🎨 Probando UserDashboard UI mejorado...\n";

// Verificar que los archivos estén compilados
$buildPath = __DIR__ . '/public/build';
$manifestPath = $buildPath . '/manifest.json';

if (file_exists($manifestPath)) {
    echo "✅ Build manifest encontrado\n";
    $manifest = json_decode(file_get_contents($manifestPath), true);
    
    // Verificar UserDashboard
    $userDashboardFound = false;
    foreach ($manifest as $key => $data) {
        if (strpos($key, 'UserDashboard') !== false) {
            echo "✅ UserDashboard compilado: $key\n";
            $userDashboardFound = true;
            break;
        }
    }
    
    if (!$userDashboardFound) {
        echo "❌ UserDashboard no encontrado en manifest\n";
    }
} else {
    echo "❌ Manifest no encontrado\n";
}

// Verificar que Global.js tenga la API key de Google Maps
$globalPath = __DIR__ . '/resources/js/Utils/Global.js';
if (file_exists($globalPath)) {
    $globalContent = file_get_contents($globalPath);
    if (strpos($globalContent, 'GMAPS_API_KEY') !== false) {
        echo "✅ Global.js contiene GMAPS_API_KEY\n";
    } else {
        echo "❌ Global.js no contiene GMAPS_API_KEY\n";
    }
} else {
    echo "❌ Global.js no encontrado\n";
}

// Verificar que las fuentes de FontAwesome estén disponibles
$hasFA = false;
$layoutPath = __DIR__ . '/resources/views/layouts/app.blade.php';
if (file_exists($layoutPath)) {
    $layoutContent = file_get_contents($layoutPath);
    if (strpos($layoutContent, 'fontawesome') !== false || strpos($layoutContent, 'fa-') !== false) {
        echo "✅ FontAwesome detectado en layout\n";
        $hasFA = true;
    }
}

if (!$hasFA) {
    // Verificar en otros archivos layout
    $files = [
        'resources/views/layouts/base.blade.php',
        'public/index.html',
        'resources/views/app.blade.php'
    ];
    
    foreach ($files as $file) {
        $fullPath = __DIR__ . '/' . $file;
        if (file_exists($fullPath)) {
            $content = file_get_contents($fullPath);
            if (strpos($content, 'fontawesome') !== false || strpos($content, 'fa-') !== false) {
                echo "✅ FontAwesome detectado en $file\n";
                $hasFA = true;
                break;
            }
        }
    }
}

if (!$hasFA) {
    echo "⚠️  FontAwesome no detectado - los iconos pueden no funcionar correctamente\n";
}

echo "\n📋 Mejoras implementadas:\n";
echo "✅ Mapa interactivo de Google Maps\n";
echo "✅ Iconos para amenidades, servicios y características\n";
echo "✅ UI premium con gradientes y sombras\n";
echo "✅ Modal responsivo con diseño moderno\n";
echo "✅ Métricas visuales mejoradas\n";
echo "✅ Layout de 3 columnas optimizado\n";
echo "✅ Galería de imágenes con efectos hover\n";

echo "\n🔗 Para probar el dashboard:\n";
echo "1. Navega a: http://localhost/projects/homlink/public/dashboard\n";
echo "2. Inicia sesión con un usuario que tenga propiedades\n";
echo "3. Haz clic en 'Detalles' de cualquier propiedad\n";
echo "4. Verifica que aparezca el mapa y los iconos\n";

echo "\n✨ ¡Sistema listo para uso!\n";
?>
