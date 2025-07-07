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
        
        return $data;
    }

    public function setReactViewProperties(Request $request)
    {
        // Opciones para los selects de sección
        $sections = [
            'home' => 'Inicio',
            'productos' => 'Productos',
            'servicios' => 'Servicios',
            'nosotros' => 'Nosotros',
            'contacto' => 'Contacto',
            'blog' => 'Blog'
        ];

        // Configuración de posiciones por sección
        $sectionPositions = [
            'home' => [
                'primera_operacion' => 'Banner Primera operación',
                'cambia_empresas' => 'Slider Cambia Empresas'
            ],
            'productos' => [
                'header' => 'Banner Principal',
                'main' => 'Sección Principal',
                'sidebar' => 'Barra Lateral',
                'grid' => 'Entre Productos'
            ],
            'servicios' => [
                'slider' => 'Slider Cambia Empresas',
            ],
            'nosotros' => [
                'header' => 'Banner Elígenos',
               
            ],
            'contacto' => [
                'header' => 'Banner Principal',
                'main' => 'Sección Principal',
                'map' => 'Mapa',
                'info' => 'Información'
            ],
            'blog' => [
                'header' => 'Banner Principal',
              
            ]
        ];

        // Todas las posiciones para mostrar en la tabla
        $allPositions = [];
        foreach ($sectionPositions as $sectionPos) {
            $allPositions = array_merge($allPositions, $sectionPos);
        }
        $allPositions = array_unique($allPositions);

        return [
            'sections' => $sections,
            'positions' => $allPositions,
            'sectionPositions' => $sectionPositions
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::ordered();
    }
}
