<?php
/**
 * Ejemplo de cómo usar el sistema SEO en el controlador de la página de inicio
 */

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Helpers\SeoHelper;
use App\Models\Post;
use App\Models\Service;

class HomeController extends Controller
{
    public function index()
    {
        // Obtener datos para la página
        $latestPosts = Post::where('status', 1)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();
            
        $featuredServices = Service::where('status', 1)
            ->where('featured', 1)
            ->take(4)
            ->get();
        
        // Datos SEO específicos para la página de inicio
        $seoTitle = SeoHelper::getValue('seo_title', 'homLynk - Plataforma Inmobiliaria');
        $seoDescription = SeoHelper::getValue('seo_description', 'Casa de cambio online con las mejores tasas de cambio. Compra y vende dólares de forma segura y rápida.');
        $seoKeywords = SeoHelper::getValue('seo_keywords', 'casa de cambio, cambio de dólares, tipo de cambio, compra dólares, venta dólares');
        
        return Inertia::render('Home', [
            'latestPosts' => $latestPosts,
            'featuredServices' => $featuredServices,
            // Datos SEO para la página
            'seoTitle' => $seoTitle,
            'seoDescription' => $seoDescription,
            'seoKeywords' => $seoKeywords,
            'seoImage' => '/assets/img/og-home.jpg',
            'seoUrl' => url('/'),
            'schemaType' => 'Organization'
        ]);
    }
}

/**
 * Ejemplo de uso en una página de blog
 */
class BlogController extends Controller
{
    public function show($slug)
    {
        $post = Post::where('slug', $slug)
            ->where('status', 1)
            ->firstOrFail();
        
        // Datos SEO específicos para este post
        $seoTitle = $post->title . ' - homLynk Blog';
        $seoDescription = $post->extract ?? substr(strip_tags($post->description), 0, 160);
        $seoKeywords = $post->tags ?? SeoHelper::getValue('seo_keywords');
        $seoImage = $post->image ? asset('api/post/media/' . $post->image) : SeoHelper::getValue('og_image_default');
        
        return Inertia::render('BlogPost', [
            'post' => $post,
            'seoTitle' => $seoTitle,
            'seoDescription' => $seoDescription,
            'seoKeywords' => $seoKeywords,
            'seoImage' => $seoImage,
            'seoUrl' => url('/blog/' . $post->slug),
            'schemaType' => 'Article'
        ]);
    }
}

/**
 * Ejemplo de uso en una página de servicios
 */
class ServiceController extends Controller
{
    public function show($slug)
    {
        $service = Service::where('slug', $slug)
            ->where('status', 1)
            ->firstOrFail();
        
        // Datos SEO específicos para este servicio
        $seoTitle = $service->title . ' - homLynk Servicios';
        $seoDescription = $service->summary ?? substr(strip_tags($service->description), 0, 160);
        $seoKeywords = $service->tags ?? SeoHelper::getValue('seo_keywords');
        $seoImage = $service->image ? asset('api/service/media/' . $service->image) : SeoHelper::getValue('og_image_default');
        
        return Inertia::render('ServiceDetail', [
            'service' => $service,
            'seoTitle' => $seoTitle,
            'seoDescription' => $seoDescription,
            'seoKeywords' => $seoKeywords,
            'seoImage' => $seoImage,
            'seoUrl' => url('/servicios/' . $service->slug),
            'schemaType' => 'Service'
        ]);
    }
}
