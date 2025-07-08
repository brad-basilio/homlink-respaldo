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
