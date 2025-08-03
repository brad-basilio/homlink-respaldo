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

        // Obtener otras propiedades relacionadas o destacadas
        $relatedData = $this->getRelatedProperties($property);

        return [
            'property' => $property,
            'otherProperties' => $relatedData['properties'],
            'otherPropertiesTitle' => $relatedData['title'],
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

    /**
     * Obtener propiedades relacionadas o destacadas
     */
    private function getRelatedProperties($currentProperty)
    {
        // 1. Buscar propiedades del mismo usuario (relacionadas)
        $relatedProperties = Property::where('user_id', $currentProperty->user_id)
            ->where('id', '!=', $currentProperty->id)
            ->where('active', true)
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        // 2. Si hay propiedades relacionadas, también incluir algunas destacadas
        if ($relatedProperties->count() > 0) {
            // Obtener IDs de las propiedades relacionadas para excluirlas
            $excludeIds = $relatedProperties->pluck('id')->toArray();
            $excludeIds[] = $currentProperty->id; // También excluir la propiedad actual

            // Obtener propiedades destacadas adicionales
            $featuredProperties = Property::where('featured', true)
                ->whereNotIn('id', $excludeIds)
                ->where('active', true)
                ->orderBy('created_at', 'desc')
                ->limit(3)
                ->get();

            // Combinar relacionadas y destacadas, máximo 3 total
            $allProperties = $relatedProperties->concat($featuredProperties);
            
            return [
                'properties' => $allProperties->take(3),
                'title' => 'Propiedades del mismo anfitrión y destacadas'
            ];
        }

        // 3. Si no hay propiedades relacionadas, traer solo destacadas
        $featuredProperties = Property::where('featured', true)
            ->where('id', '!=', $currentProperty->id)
            ->where('active', true)
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        // 4. Si no hay destacadas suficientes, completar con propiedades normales
        if ($featuredProperties->count() < 3) {
            $excludeIds = $featuredProperties->pluck('id')->toArray();
            $excludeIds[] = $currentProperty->id;

            $normalProperties = Property::whereNotIn('id', $excludeIds)
                ->where('active', true)
                ->orderBy('created_at', 'desc')
                ->limit(3 - $featuredProperties->count())
                ->get();

            $allProperties = $featuredProperties->concat($normalProperties);
            
            return [
                'properties' => $allProperties,
                'title' => $featuredProperties->count() > 0 
                    ? 'Propiedades destacadas y otros departamentos'
                    : 'Otros departamentos que te pueden gustar'
            ];
        }

        return [
            'properties' => $featuredProperties,
            'title' => 'Propiedades destacadas'
        ];
    }
}
