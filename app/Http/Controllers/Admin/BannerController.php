<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BannerController extends BasicController
{
    public $model = Banner::class;
    public $reactView = 'Admin/Banners';
    public $imageFields = ['image'];

    public function beforeSave(Request $request)
    {
        // Debug: Log datos recibidos
        Log::info('Banner save request data:', ['data' => $request->all()]);
        Log::info('Request headers:', ['headers' => $request->headers->all()]);
        Log::info('User authenticated:', ['authenticated' => auth()->check()]);
        Log::info('User can admin:', ['can_admin' => auth()->check() ? auth()->user()->can('Admin') : false]);
        
        $data = $request->all();
        
        // Asegurar que el order sea numérico
        if (isset($data['order'])) {
            $data['order'] = (int) $data['order'];
        }
        
        // Definir posiciones que permiten múltiples banners (sliders)
        $multipleAllowedPositions = [
            'slider', // Sliders generales
            'cambia_empresas' // Solo cuando es slider, no banner individual
        ];
        
        // Verificar si la posición permite múltiples banners
        $allowMultiple = in_array($data['position'] ?? '', $multipleAllowedPositions);
        
        // Lógica especial para 'cambia_empresas': solo permite múltiples en sección 'home'
        if ($data['position'] === 'cambia_empresas' && $data['section'] !== 'home') {
            $allowMultiple = false; // En otras secciones que no sean 'home', solo permite uno
        }
        
        // Si no permite múltiples, verificar que no exista otro banner con la misma section/position
        if (!$allowMultiple && isset($data['section']) && isset($data['position'])) {
            $existingBanner = Banner::where('section', $data['section'])
                                   ->where('position', $data['position']);
            
            // Si estamos editando, excluir el banner actual de la verificación
            if (isset($data['id']) && $data['id']) {
                $existingBanner = $existingBanner->where('id', '!=', $data['id']);
            }
            
            $existingBanner = $existingBanner->first();
            
            if ($existingBanner) {
                throw new \Exception("Ya existe un banner para la sección '{$data['section']}' en la posición '{$data['position']}'. Solo se permite un banner por posición para esta ubicación.");
            }
        }
        
        return $data;
    }

    public function setReactViewProperties(Request $request)
    {
        // Opciones para los selects de sección
        $sections = [
            'home' => 'Inicio',
            'empresa' => 'Empresas',
            'servicios' => 'Servicios',
            'nosotros' => 'Nosotros',
         
            'blog' => 'Blog'
        ];

        // Configuración de posiciones por sección
        $sectionPositions = [
            'home' => [
                'primera_operacion' => 'Banner Primera operación',
                'cambia_empresas' => 'Slider Cambia Empresas'
            ],
          
            'servicios' => [
                'slider' => 'Slider Cambia Empresas',
            ],
            'nosotros' => [
                'header' => 'Banner Elígenos',
               
            ],
           
            'blog' => [
                'header' => 'Banner Principal',
                'article'=>'Detalle del Blog'
              
            ],
               'empresa' => [
                'primera_operacion' => 'Banner Primera operación',
                'cambia_empresas' => 'Banner Cambia Empresas'
            ],
        ];

        // Todas las posiciones para mostrar en la tabla
        $allPositions = [];
        foreach ($sectionPositions as $sectionPos) {
            $allPositions = array_merge($allPositions, $sectionPos);
        }
        $allPositions = array_unique($allPositions);

        // Definir qué posiciones permiten múltiples banners
        $multipleAllowedPositions = [
            'slider', // Sliders generales siempre permiten múltiples
            'cambia_empresas' // Solo permite múltiples en sección 'home'
        ];

        return [
            'sections' => $sections,
            'positions' => $allPositions,
            'sectionPositions' => $sectionPositions,
            'multipleAllowedPositions' => $multipleAllowedPositions
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::ordered();
    }
}
