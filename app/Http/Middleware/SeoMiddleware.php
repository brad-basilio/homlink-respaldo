<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use App\Helpers\SeoHelper;

class SeoMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Compartir los datos SEO con todas las vistas
        View::share('seoHelper', new SeoHelper());
        
        // Obtener datos SEO específicos para esta página
        $routeName = $request->route()->getName();
        $seoData = $this->getPageSeoData($routeName);
        
        // Compartir datos SEO específicos de la página
        View::share('seoTitle', $seoData['title']);
        View::share('seoDescription', $seoData['description']);
        View::share('seoKeywords', $seoData['keywords']);
        View::share('seoImage', $seoData['image']);
        View::share('seoUrl', $seoData['url']);
        
        return $next($request);
    }
    
    /**
     * Obtiene los datos SEO específicos para cada página
     */
    private function getPageSeoData($routeName)
    {
        $seoData = SeoHelper::getSeoData();
        
        // Configuración SEO específica por página
        $pageConfigs = [
            'Home.jsx' => [
                'title' => $seoData['seo_title'] ?? 'Homlynk',
                'description' => $seoData['seo_description'] ?? 'Homlynk',
                'keywords' => $seoData['seo_keywords'] ?? 'Homlynk',
                'image' => '/assets/img/og-home.jpg',
                'url' => url('/')
            ],
            'Nosotros.jsx' => [
                'title' => 'Nosotros - Homlynk',
                'description' => 'Conoce más sobre Homlynk',
                'keywords' => 'nosotros, sobre Homlynk',
                'image' => '/assets/img/og-nosotros.jpg',
                'url' => url('/nosotros')
            ],
            'Contacto.jsx' => [
                'title' => 'Contacto - Homlynk',
                'description' => 'Contáctanos para resolver tus dudas.',
                'keywords' => 'contacto, soporte, atención al cliente',
                'image' => '/assets/img/og-contacto.jpg',
                'url' => url('/contacto')
            ],
            'Servicios.jsx' => [
                'title' => 'Servicios - Homlynk',
                'description' => '',
                'keywords' => '',
                'image' => '/assets/img/og-servicios.jpg',
                'url' => url('/servicios')
            ],
            'Blog.jsx' => [
                'title' => 'Blog - Homlynk',
                'description' => '',
                'keywords' => '',
                'image' => '/assets/img/og-blog.jpg',
                'url' => url('/blog')
            ]
        ];
        
        // Configuración por defecto
        $defaultConfig = [
            'title' => $seoData['seo_title'] ?? 'Homlynk',
            'description' => $seoData['seo_description'] ?? '',
            'keywords' => $seoData['seo_keywords'] ?? '',
            'image' => '/assets/img/og-default.jpg',
            'url' => url()->current()
        ];
        
        return $pageConfigs[$routeName] ?? $defaultConfig;
    }
}
