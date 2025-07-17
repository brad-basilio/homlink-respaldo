<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\SeoHelper;
use App\Models\Post;
use App\Models\Service;
use Inertia\Inertia;

class SeoController extends Controller
{
    /**
     * Ejemplo de cómo usar SEO para una página específica
     */
    public function blogPost($slug)
    {
        $post = Post::where('slug', $slug)
            ->where('status', 1)
            ->where('visible', 1)
            ->firstOrFail();
        
        // Generar datos SEO específicos para este post
        $seoTitle = $post->title . ' - CambiaFX Blog';
        $seoDescription = $post->extract ?? substr(strip_tags($post->description), 0, 160);
        $seoKeywords = $post->tags ?? SeoHelper::getValue('seo_keywords');
        $seoImage = $post->image ? asset('api/post/media/' . $post->image) : null;
        $seoUrl = url('/blog/' . $post->slug);
        
        return Inertia::render('BlogPost', [
            'post' => $post,
            'seoTitle' => $seoTitle,
            'seoDescription' => $seoDescription,
            'seoKeywords' => $seoKeywords,
            'seoImage' => $seoImage,
            'seoUrl' => $seoUrl,
            'schemaType' => 'Article'
        ]);
    }
    
    /**
     * Ejemplo de cómo usar SEO para una página de servicio
     */
    public function serviceDetail($slug)
    {
        $service = Service::where('slug', $slug)
            ->where('status', 1)
            ->where('visible', 1)
            ->firstOrFail();
        
        // Generar datos SEO específicos para este servicio
        $seoTitle = $service->title . ' - CambiaFX Servicios';
        $seoDescription = $service->summary ?? substr(strip_tags($service->description), 0, 160);
        $seoKeywords = $service->tags ?? SeoHelper::getValue('seo_keywords');
        $seoImage = $service->image ? asset('api/service/media/' . $service->image) : null;
        $seoUrl = url('/servicios/' . $service->slug);
        
        return Inertia::render('ServiceDetail', [
            'service' => $service,
            'seoTitle' => $seoTitle,
            'seoDescription' => $seoDescription,
            'seoKeywords' => $seoKeywords,
            'seoImage' => $seoImage,
            'seoUrl' => $seoUrl,
            'schemaType' => 'Service'
        ]);
    }
    
    /**
     * Ejemplo de cómo usar SEO para páginas dinámicas
     */
    public function dynamicPage(Request $request)
    {
        $page = $request->route('page');
        
        // Datos SEO específicos por página
        $seoConfigs = [
            'tipo-de-cambio' => [
                'title' => 'Tipo de Cambio Hoy - CambiaFX',
                'description' => 'Consulta el tipo de cambio actual del dólar en tiempo real. Las mejores tasas de cambio en CambiaFX.',
                'keywords' => 'tipo de cambio, dólar hoy, cambio dólar, tasa cambio',
                'image' => '/assets/img/og-tipo-cambio.jpg'
            ],
            'cambio-dolares' => [
                'title' => 'Cambio de Dólares Online - CambiaFX',
                'description' => 'Cambia tus dólares de forma segura y rápida. Proceso 100% online con las mejores tasas del mercado.',
                'keywords' => 'cambio dólares, compra dólares, venta dólares, casa cambio',
                'image' => '/assets/img/og-cambio-dolares.jpg'
            ]
        ];
        
        $seoData = $seoConfigs[$page] ?? [
            'title' => 'CambiaFX - Casa de Cambio Online',
            'description' => 'Tu casa de cambio de confianza en línea.',
            'keywords' => SeoHelper::getValue('seo_keywords'),
            'image' => '/assets/img/og-default.jpg'
        ];
        
        return Inertia::render('DynamicPage', [
            'page' => $page,
            'seoTitle' => $seoData['title'],
            'seoDescription' => $seoData['description'],
            'seoKeywords' => $seoData['keywords'],
            'seoImage' => $seoData['image'],
            'seoUrl' => url('/' . $page)
        ]);
    }
}
