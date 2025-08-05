<?php

namespace App\Helpers;

use App\Models\General;
use Illuminate\Support\Facades\Cache;

class SeoHelper
{
    /**
     * Obtiene los datos SEO de la tabla generals
     */
    public static function getSeoData()
    {
        return Cache::remember('seo_data', 3600, function () {
            $generals = General::whereIn('correlative', [
                'seo_title',
                'seo_description', 
                'seo_keywords',
                'company_name',
                'company_description',
                'company_logo',
                'company_url',
                'company_phone',
                'company_email',
                'company_address',
                'twitter_site',
                'facebook_page',
                'instagram_profile',
                'linkedin_profile'
            ])->get();

            $seoData = [];
            foreach ($generals as $general) {
                $seoData[$general->correlative] = $general->description;
            }

            return $seoData;
        });
    }

    /**
     * Obtiene el valor de un correlativo específico
     */
    public static function getValue($correlative, $default = '')
    {
        $seoData = self::getSeoData();
        return $seoData[$correlative] ?? $default;
    }

    /**
     * Genera las meta tags SEO básicas
     */
    public static function getBasicMetaTags($title = null, $description = null, $keywords = null)
    {
        $seoData = self::getSeoData();
        
        $title = $title ?? $seoData['seo_title'] ?? 'Homlynk';
        $description = $description ?? $seoData['seo_description'] ?? 'Homlynk';
        $keywords = $keywords ?? $seoData['seo_keywords'] ?? 'homlynk';
        
        return [
            'title' => $title,
            'description' => $description,
            'keywords' => $keywords
        ];
    }

    /**
     * Genera las meta tags Open Graph para redes sociales
     */
    public static function getOpenGraphTags($title = null, $description = null, $image = null, $url = null)
    {
        $seoData = self::getSeoData();
        
        $title = $title ?? $seoData['seo_title'] ?? 'CambiaFX - Casa de Cambio Online';
        $description = $description ?? $seoData['seo_description'] ?? 'Casa de cambio online con las mejores tasas de cambio. Compra y vende dólares de forma segura y rápida.';
        $image = $image ?? $seoData['company_logo'] ?? '/assets/img/logo.png';
        $url = $url ?? $seoData['company_url'] ?? url()->current();
        
        return [
            'og:title' => $title,
            'og:description' => $description,
            'og:image' => $image,
            'og:url' => $url,
            'og:type' => 'website',
            'og:site_name' => $seoData['company_name'] ?? 'CambiaFX'
        ];
    }

    /**
     * Genera las meta tags Twitter Card
     */
    public static function getTwitterCardTags($title = null, $description = null, $image = null)
    {
        $seoData = self::getSeoData();
        
        $title = $title ?? $seoData['seo_title'] ?? 'CambiaFX - Casa de Cambio Online';
        $description = $description ?? $seoData['seo_description'] ?? 'Casa de cambio online con las mejores tasas de cambio. Compra y vende dólares de forma segura y rápida.';
        $image = $image ?? $seoData['company_logo'] ?? '/assets/img/logo.png';
        
        return [
            'twitter:card' => 'summary_large_image',
            'twitter:title' => $title,
            'twitter:description' => $description,
            'twitter:image' => $image,
            'twitter:site' => $seoData['twitter_site'] ?? '@cambiafx'
        ];
    }

    /**
     * Genera el JSON-LD para Schema.org
     */
    public static function getJsonLD($type = 'Organization')
    {
        $seoData = self::getSeoData();
        
        if ($type === 'Organization') {
            return [
                '@context' => 'https://schema.org',
                '@type' => 'Organization',
                'name' => $seoData['company_name'] ?? 'CambiaFX',
                'description' => $seoData['company_description'] ?? $seoData['seo_description'] ?? 'Casa de cambio online con las mejores tasas de cambio',
                'url' => $seoData['company_url'] ?? url('/'),
                'logo' => $seoData['company_logo'] ?? '/assets/img/logo.png',
                'telephone' => $seoData['company_phone'] ?? '',
                'email' => $seoData['company_email'] ?? '',
                'address' => [
                    '@type' => 'PostalAddress',
                    'streetAddress' => $seoData['company_address'] ?? ''
                ],
                'sameAs' => array_filter([
                    $seoData['facebook_page'] ?? '',
                    $seoData['instagram_profile'] ?? '',
                    $seoData['linkedin_profile'] ?? '',
                    $seoData['twitter_site'] ?? ''
                ])
            ];
        }
        
        return [];
    }
}
