# Sistema SEO Integrado - CambiaFX

## Descripción
Este sistema SEO integra automáticamente los datos de la tabla `generals` con metadatos optimizados para motores de búsqueda y redes sociales.

## Características Principales

### ✅ Datos SEO desde Base de Datos
- **Título SEO**: `seo_title`
- **Descripción SEO**: `seo_description`
- **Palabras Clave**: `seo_keywords`
- **Datos de Empresa**: `company_name`, `company_description`, etc.

### ✅ Meta Tags Optimizados
- Meta tags básicos (title, description, keywords)
- Open Graph para Facebook, LinkedIn, etc.
- Twitter Cards para Twitter
- Schema.org JSON-LD para Google

### ✅ Integración Automática
- Middleware que carga datos SEO automáticamente
- Componente Blade reutilizable
- Helper para acceso fácil a datos SEO

## Configuración Inicial

### 1. Ejecutar Seeder
```bash
php artisan db:seed --class=SeoGeneralSeeder
```

### 2. Configurar Datos en Admin
Ve a `/admin/generals` y configura:
- Título SEO
- Descripción SEO
- Palabras clave
- Datos de empresa
- Redes sociales

## Uso en Controladores

### Página Simple
```php
return Inertia::render('MiPagina', [
    'seoTitle' => 'Mi Título Personalizado',
    'seoDescription' => 'Mi descripción personalizada',
    'seoKeywords' => 'palabra1, palabra2, palabra3',
    'seoImage' => '/assets/img/mi-imagen.jpg',
    'seoUrl' => url('/mi-pagina')
]);
```

### Página Dinámica (Blog Post)
```php
$post = Post::find($id);

return Inertia::render('BlogPost', [
    'post' => $post,
    'seoTitle' => $post->title . ' - CambiaFX Blog',
    'seoDescription' => $post->extract,
    'seoKeywords' => $post->tags,
    'seoImage' => asset('api/post/media/' . $post->image),
    'seoUrl' => url('/blog/' . $post->slug),
    'schemaType' => 'Article'
]);
```

## Uso del Helper

### Obtener Datos Generales
```php
use App\Helpers\SeoHelper;

// Obtener un valor específico
$title = SeoHelper::getValue('seo_title');

// Obtener todos los datos SEO
$seoData = SeoHelper::getSeoData();

// Generar meta tags básicos
$meta = SeoHelper::getBasicMetaTags($title, $description, $keywords);
```

### Generar Tags Específicos
```php
// Open Graph
$ogTags = SeoHelper::getOpenGraphTags($title, $description, $image, $url);

// Twitter Cards
$twitterTags = SeoHelper::getTwitterCardTags($title, $description, $image);

// Schema.org JSON-LD
$jsonLD = SeoHelper::getJsonLD('Article'); // Organization, Article, Product, etc.
```

## Componente Blade

### Uso Básico
```blade
@include('components.seo-meta-tags')
```

### Uso con Parámetros
```blade
@include('components.seo-meta-tags', [
    'title' => 'Mi Título',
    'description' => 'Mi descripción',
    'keywords' => 'palabra1, palabra2',
    'image' => '/assets/img/mi-imagen.jpg',
    'url' => url('/mi-pagina'),
    'schemaType' => 'Article'
])
```

## Configuración por Página

El middleware `SeoMiddleware` configura automáticamente SEO según la ruta:

```php
// En SeoMiddleware.php
'Home.jsx' => [
    'title' => 'CambiaFX - Casa de Cambio Online',
    'description' => 'Casa de cambio con las mejores tasas...',
    'keywords' => 'casa de cambio, dólares, soles',
    'image' => '/assets/img/og-home.jpg'
],
```

## Correlativos SEO Disponibles

### Básicos
- `seo_title`: Título principal del sitio
- `seo_description`: Descripción principal
- `seo_keywords`: Palabras clave principales

### Empresa
- `company_name`: Nombre de la empresa
- `company_description`: Descripción de la empresa
- `company_logo`: Logo para Open Graph
- `company_url`: URL principal
- `company_phone`: Teléfono
- `company_email`: Email
- `company_address`: Dirección

### Redes Sociales
- `twitter_site`: @usuario de Twitter
- `facebook_page`: URL de Facebook
- `instagram_profile`: URL de Instagram
- `linkedin_profile`: URL de LinkedIn

### Verificación
- `google_site_verification`: Meta tag de Google
- `bing_site_verification`: Meta tag de Bing

## Generar Sitemap

```bash
php artisan sitemap:generate
```

Esto genera automáticamente un `sitemap.xml` en la carpeta `public/`.

## Mejores Prácticas

### 1. Títulos SEO
- Máximo 60 caracteres
- Incluir palabras clave principales
- Formato: "Título Principal - Marca"

### 2. Descripciones
- Entre 150-160 caracteres
- Incluir llamada a la acción
- Describir el contenido claramente

### 3. Imágenes Open Graph
- Tamaño: 1200x630 píxeles
- Formato: JPG o PNG
- Peso: Menos de 1MB

### 4. Palabras Clave
- Separadas por comas
- Máximo 10 palabras clave
- Relevantes al contenido

## Validación

### Herramientas Recomendadas
- **Google Search Console**: Verificar indexación
- **Facebook Debugger**: Validar Open Graph
- **Twitter Card Validator**: Validar Twitter Cards
- **Schema.org Validator**: Validar JSON-LD

### URLs de Validación
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- Google: https://search.google.com/structured-data/testing-tool

## Ejemplo Completo

```php
// En tu controlador
public function show($slug)
{
    $post = Post::where('slug', $slug)->firstOrFail();
    
    return Inertia::render('BlogPost', [
        'post' => $post,
        'seoTitle' => $post->title . ' - CambiaFX Blog',
        'seoDescription' => $post->extract,
        'seoKeywords' => $post->tags,
        'seoImage' => asset('api/post/media/' . $post->image),
        'seoUrl' => url('/blog/' . $post->slug),
        'schemaType' => 'Article'
    ]);
}
```

El sistema automáticamente:
1. Carga los datos SEO desde la base de datos
2. Genera las meta tags apropiadas
3. Incluye Open Graph y Twitter Cards
4. Agrega Schema.org JSON-LD
5. Establece la URL canónica

¡Perfecto para SEO y redes sociales! 🚀
