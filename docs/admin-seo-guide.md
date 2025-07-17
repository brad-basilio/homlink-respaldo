# Guía de Configuración SEO en Admin - CambiaFX

## Acceso al Panel SEO

1. Ve a `/admin/generals` 
2. Encontrarás **5 nuevas pestañas** para configurar SEO:
   - **SEO Básico**: Título, descripción y palabras clave principales
   - **SEO Avanzado**: Datos de empresa y verificaciones
   - **Redes Sociales**: URLs de perfiles sociales
   - **Ubicación**: Mapa de Google Maps
   - **Email**: Plantillas de notificaciones

## 📊 Pestaña: SEO Básico

### Título SEO
- **Campo**: `seo_title`
- **Límite**: 60 caracteres máximo
- **Ejemplo**: `CambiaFX - Casa de Cambio Online`
- **Aparece en**: Resultados de Google, pestañas del navegador

### Descripción SEO
- **Campo**: `seo_description`
- **Límite**: 150-160 caracteres
- **Ejemplo**: `Casa de cambio online con las mejores tasas de cambio. Compra y vende dólares de forma segura y rápida.`
- **Aparece en**: Debajo del título en Google

### Palabras Clave SEO
- **Campo**: `seo_keywords`
- **Formato**: Separadas por comas
- **Ejemplo**: `casa de cambio, cambio de dólares, tipo de cambio, compra dólares`
- **Recomendación**: Máximo 10 palabras clave relevantes

## 🏢 Pestaña: SEO Avanzado

### Datos de Empresa
- **Nombre**: `company_name` → `CambiaFX - Tu Cambio S.A.C.`
- **URL**: `company_url` → `https://cambiafx.com`
- **Descripción**: `company_description` → Descripción completa de la empresa
- **Teléfono**: `company_phone` → `+51 945 622 983`
- **Email**: `company_email` → `info@cambiafx.com`
- **Dirección**: `company_address` → `Lima, Perú`

### Imágenes Open Graph
- **Logo**: `company_logo` → `/assets/img/logo-og.png`
- **Imagen por defecto**: `og_image_default` → `/assets/img/og-default.jpg`
- **Tamaño recomendado**: 1200x630 píxeles

### Verificaciones de Sitio
- **Google**: `google_site_verification` → Código de Google Search Console
- **Bing**: `bing_site_verification` → Código de Bing Webmaster Tools

## 📱 Pestaña: Redes Sociales

### Perfiles Sociales
- **Twitter**: `twitter_site` → `@cambiafx`
- **Facebook**: `facebook_page` → `https://facebook.com/cambiafx`
- **Instagram**: `instagram_profile` → `https://instagram.com/cambiafx`
- **LinkedIn**: `linkedin_profile` → `https://linkedin.com/company/cambiafx`

### Imagen Twitter
- **Campo**: `twitter_image_default` → `/assets/img/twitter-default.jpg`
- **Tamaño**: 1200x600 píxeles para Twitter Cards

## 🎯 Beneficios Inmediatos

### Para Google
- ✅ Mejor posicionamiento en buscadores
- ✅ Rich snippets con datos estructurados
- ✅ Información de empresa en Knowledge Graph

### Para Redes Sociales
- ✅ **Facebook/WhatsApp**: Vista previa con imagen y descripción
- ✅ **Twitter**: Twitter Cards con imagen
- ✅ **LinkedIn**: Vista previa profesional
- ✅ **Instagram**: Enlaces con preview optimizado

### Para Usuarios
- ✅ Mejor experiencia al compartir enlaces
- ✅ Información clara y profesional
- ✅ Mayor confianza en la marca

## 🔧 Cómo Funciona

### Automático
1. **Guardas** la configuración en Admin
2. **El sistema** genera automáticamente:
   - Meta tags básicos
   - Open Graph tags
   - Twitter Cards
   - Schema.org JSON-LD
   - Sitemap.xml

### Manual por Página
Los desarrolladores pueden sobrescribir datos por página:

```php
// En controlador
return Inertia::render('MiPagina', [
    'seoTitle' => 'Título específico',
    'seoDescription' => 'Descripción específica',
    'seoImage' => '/assets/img/mi-imagen.jpg'
]);
```

## 🚀 Comandos Útiles

### Generar Sitemap
```bash
php artisan sitemap:generate
```

### Limpiar Cache SEO
```bash
php artisan cache:clear
```

### Verificar Datos SEO
```bash
php artisan tinker
App\Helpers\SeoHelper::getSeoData()
```

## ✅ Checklist de Configuración

### SEO Básico
- [ ] Título SEO configurado (máx. 60 chars)
- [ ] Descripción SEO configurada (150-160 chars)
- [ ] Palabras clave agregadas

### SEO Avanzado  
- [ ] Nombre de empresa
- [ ] URL de empresa
- [ ] Descripción de empresa
- [ ] Teléfono y email
- [ ] Dirección
- [ ] Logo Open Graph subido
- [ ] Imagen por defecto subida

### Redes Sociales
- [ ] Perfiles sociales configurados
- [ ] Imagen Twitter subida
- [ ] URLs validadas y accesibles

### Verificaciones
- [ ] Google Site Verification configurado
- [ ] Bing Site Verification configurado
- [ ] Sitemap.xml generado

## 🛠️ Herramientas de Validación

### Validar SEO
- **Google Search Console**: https://search.google.com/search-console
- **Google PageSpeed**: https://pagespeed.web.dev/

### Validar Redes Sociales
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Inspector**: https://www.linkedin.com/post-inspector/

### Validar Schema.org
- **Google Rich Results**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/

## 📈 Monitoreo

### Métricas a Seguir
- **CTR en Google**: Mejora con títulos y descripciones optimizadas
- **Shares en redes**: Aumenta con Open Graph bien configurado
- **Tráfico orgánico**: Crece con SEO bien implementado
- **Posicionamiento**: Mejora con datos estructurados

¡Con esta configuración tendrás un SEO profesional completo! 🎉
