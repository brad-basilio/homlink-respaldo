<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class PropertyDetailController extends BasicController
{
    public $model = Property::class;
    public $reactView = 'PropertyDetail';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $slug = $request->route('slug');
        
        // Buscar la propiedad por slug o ID
        $property = Property::where('slug', $slug)
            ->orWhere('id', $slug)
            ->where('active', true)
            ->first();

        if (!$property) {
            abort(404, 'Propiedad no encontrada');
        }

        return [
            'property' => $property,
            'seo' => [
                'title' => $property->title . ' - Homlink',
                'description' => $property->description ? substr($property->description, 0, 160) : 'Descubre esta increíble propiedad en ' . $property->district,
                'keywords' => implode(', ', array_filter([
                    $property->title,
                    $property->district,
                    $property->city,
                    'alquiler',
                    'hospedaje',
                    'airbnb'
                ])),
                'image' => $property->main_image_url ?: ($property->main_image ? url('/api/property/media/' . $property->main_image) : null)
            ]
        ];
    }
}
