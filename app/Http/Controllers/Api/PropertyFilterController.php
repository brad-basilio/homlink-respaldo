<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PropertyFilterController extends Controller
{
    /**
     * Get available filters from database
     */
    public function getAvailableFilters()
    {
        // Obtener amenidades únicas
        $amenities = Property::where('active', true)
            ->whereNotNull('amenities')
            ->where('amenities', '!=', '[]')
            ->pluck('amenities')
            ->flatten()
            ->unique()
            ->values()
            ->toArray();

        // Obtener servicios únicos
        $services = Property::where('active', true)
            ->whereNotNull('services')
            ->where('services', '!=', '[]')
            ->pluck('services')
            ->flatten()
            ->unique()
            ->values()
            ->toArray();

        // Obtener características únicas
        $characteristics = Property::where('active', true)
            ->whereNotNull('characteristics')
            ->where('characteristics', '!=', '[]')
            ->pluck('characteristics')
            ->flatten()
            ->unique()
            ->values()
            ->toArray();

        // Obtener rangos de precio
        $priceStats = Property::where('active', true)
            ->select(
                DB::raw('MIN(price_per_night) as min_price'),
                DB::raw('MAX(price_per_night) as max_price'),
                DB::raw('AVG(price_per_night) as avg_price')
            )
            ->first();

        // Obtener ubicaciones únicas
        $locations = Property::where('active', true)
            ->whereNotNull('district')
            ->select('department', 'province', 'district')
            ->distinct()
            ->get()
            ->map(function($location) {
                return [
                    'department' => $location->department,
                    'province' => $location->province,
                    'district' => $location->district,
                    'full_location' => trim($location->district . ', ' . $location->province . ', ' . $location->department, ', ')
                ];
            });

        // Obtener estadísticas generales
        $stats = [
            'total_properties' => Property::where('active', true)->count(),
            'featured_properties' => Property::where('active', true)->where('featured', true)->count(),
            'max_guests' => Property::where('active', true)->max('max_guests') ?? 8,
            'max_bedrooms' => Property::where('active', true)->max('bedrooms') ?? 5,
            'platforms' => Property::where('active', true)->distinct()->pluck('platform')->filter()->values()
        ];

        return response()->json([
            'amenities' => $amenities,
            'services' => $services,
            'characteristics' => $characteristics,
            'price_stats' => [
                'min' => (float) ($priceStats->min_price ?? 0),
                'max' => (float) ($priceStats->max_price ?? 500),
                'avg' => (float) ($priceStats->avg_price ?? 100)
            ],
            'locations' => $locations,
            'stats' => $stats
        ]);
    }

    /**
     * Filter properties based on criteria
     */
    public function filterProperties(Request $request)
    {
        $query = Property::where('active', true);

        // Filtro por precio
        if ($request->has('price_min')) {
            $query->where('price_per_night', '>=', $request->price_min);
        }
        if ($request->has('price_max')) {
            $query->where('price_per_night', '<=', $request->price_max);
        }

        // Filtro por huéspedes
        if ($request->has('guests')) {
            $query->where('max_guests', '>=', $request->guests);
        }

        // Filtro por dormitorios
        if ($request->has('bedrooms')) {
            $query->where('bedrooms', '>=', $request->bedrooms);
        }

        // Filtro por amenidades
        if ($request->has('amenities') && is_array($request->amenities)) {
            foreach ($request->amenities as $amenity) {
                $query->whereJsonContains('amenities', $amenity);
            }
        }

        // Filtro por servicios
        if ($request->has('services') && is_array($request->services)) {
            foreach ($request->services as $service) {
                $query->whereJsonContains('services', $service);
            }
        }

        // Filtro por características
        if ($request->has('characteristics') && is_array($request->characteristics)) {
            foreach ($request->characteristics as $characteristic) {
                $query->whereJsonContains('characteristics', $characteristic);
            }
        }

        // Filtro por ubicación
        if ($request->has('location')) {
            $location = $request->location;
            if (isset($location['lat']) && isset($location['lng'])) {
                // Filtrar por radio (usando aproximación)
                $radius = $request->radius ?? 5; // 5km por defecto
                $lat = $location['lat'];
                $lng = $location['lng'];
                
                $query->whereRaw("
                    (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) <= ?
                ", [$lat, $lng, $lat, $radius]);
            }
        }

        // Filtro por distrito/provincia
        if ($request->has('district')) {
            $query->where('district', 'like', '%' . $request->district . '%');
        }
        if ($request->has('province')) {
            $query->where('province', 'like', '%' . $request->province . '%');
        }

        // Filtro por destacados
        if ($request->has('featured') && $request->featured) {
            $query->where('featured', true);
        }

        // Filtro por plataforma
        if ($request->has('platform')) {
            $query->where('platform', $request->platform);
        }

        // Ordenamiento
        $sortBy = $request->sort_by ?? 'created_at';
        $sortOrder = $request->sort_order ?? 'desc';
        
        $allowedSorts = ['created_at', 'price_per_night', 'rating', 'title'];
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortOrder);
        }

        // Paginación
        $perPage = min($request->per_page ?? 20, 50); // Máximo 50 por página
        $properties = $query->paginate($perPage);

        return response()->json([
            'properties' => $properties->items(),
            'total' => $properties->total(),
            'per_page' => $properties->perPage(),
            'current_page' => $properties->currentPage(),
            'last_page' => $properties->lastPage(),
            'from' => $properties->firstItem(),
            'to' => $properties->lastItem()
        ]);
    }
}
