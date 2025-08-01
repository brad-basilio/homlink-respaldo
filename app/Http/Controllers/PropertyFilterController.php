<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PropertyFilterController extends Controller
{
    /**
     * Get unique amenities from database
     */
    public function getAmenities()
    {
        $amenities = Property::where('active', true)
            ->whereNotNull('amenities')
            ->where('amenities', '!=', '[]')
            ->pluck('amenities')
            ->map(function($item) {
                return is_string($item) ? json_decode($item, true) : $item;
            })
            ->flatten()
            ->unique()
            ->values()
            ->filter()
            ->toArray();

        return response()->json($amenities);
    }

    /**
     * Get unique services from database
     */
    public function getServices()
    {
        $services = Property::where('active', true)
            ->whereNotNull('services')
            ->where('services', '!=', '[]')
            ->pluck('services')
            ->map(function($item) {
                return is_string($item) ? json_decode($item, true) : $item;
            })
            ->flatten()
            ->unique()
            ->values()
            ->filter()
            ->toArray();

        return response()->json($services);
    }

    /**
     * Get unique characteristics from database
     */
    public function getCharacteristics()
    {
        $characteristics = Property::where('active', true)
            ->whereNotNull('characteristics')
            ->where('characteristics', '!=', '[]')
            ->pluck('characteristics')
            ->map(function($item) {
                return is_string($item) ? json_decode($item, true) : $item;
            })
            ->flatten()
            ->unique()
            ->values()
            ->filter()
            ->toArray();

        return response()->json($characteristics);
    }

    /**
     * Get unique property types from database
     */
    public function getPropertyTypes()
    {
        $types = Property::where('active', true)
            ->whereNotNull('property_type')
            ->distinct()
            ->pluck('property_type')
            ->filter()
            ->values()
            ->toArray();

        return response()->json($types);
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

        // Filtro por baños
        if ($request->has('bathrooms')) {
            $query->where('bathrooms', '>=', $request->bathrooms);
        }

        // Filtro por amenidades
        if ($request->has('amenities') && is_array($request->amenities)) {
            foreach ($request->amenities as $amenity) {
                $query->where(function($q) use ($amenity) {
                    $q->whereJsonContains('amenities', $amenity)
                      ->orWhere('amenities', 'like', '%"' . $amenity . '"%');
                });
            }
        }

        // Filtro por servicios
        if ($request->has('services') && is_array($request->services)) {
            foreach ($request->services as $service) {
                $query->where(function($q) use ($service) {
                    $q->whereJsonContains('services', $service)
                      ->orWhere('services', 'like', '%"' . $service . '"%');
                });
            }
        }

        // Filtro por características
        if ($request->has('characteristics') && is_array($request->characteristics)) {
            foreach ($request->characteristics as $characteristic) {
                $query->where(function($q) use ($characteristic) {
                    $q->whereJsonContains('characteristics', $characteristic)
                      ->orWhere('characteristics', 'like', '%"' . $characteristic . '"%');
                });
            }
        }

        // Filtro por tipo de propiedad
        if ($request->has('property_type')) {
            $query->where('property_type', $request->property_type);
        }

        // Filtro por ubicación geográfica
        if ($request->has('location')) {
            $location = $request->location;
            if (isset($location['lat']) && isset($location['lng']) && $location['lat'] && $location['lng']) {
                $radius = $request->radius ?? 10; // 10km por defecto
                $lat = floatval($location['lat']);
                $lng = floatval($location['lng']);
                
                // Usar la fórmula haversine para calcular distancia
                $query->whereRaw("
                    (6371 * acos(
                        cos(radians(?)) * 
                        cos(radians(latitude)) * 
                        cos(radians(longitude) - radians(?)) + 
                        sin(radians(?)) * 
                        sin(radians(latitude))
                    )) <= ?
                ", [$lat, $lng, $lat, $radius]);
            }
        }

        // Filtro por distrito/provincia/departamento
        if ($request->has('district') && $request->district) {
            $query->where('district', 'like', '%' . $request->district . '%');
        }
        if ($request->has('province') && $request->province) {
            $query->where('province', 'like', '%' . $request->province . '%');
        }
        if ($request->has('department') && $request->department) {
            $query->where('department', 'like', '%' . $request->department . '%');
        }

        // Filtro por destacados
        if ($request->has('featured') && $request->featured) {
            $query->where('featured', true);
        }

        // Filtro por disponibilidad
        if ($request->has('available') && $request->available) {
            $query->where('available', true);
        }

        // Ordenamiento
        $sortBy = $request->sort_by ?? 'created_at';
        $sortOrder = $request->sort_order ?? 'desc';
        
        $allowedSorts = ['created_at', 'price_per_night', 'rating', 'title', 'max_guests', 'bedrooms'];
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortOrder);
        }

        // Paginación
        $perPage = min($request->per_page ?? 20, 50); // Máximo 50 por página
        $properties = $query->with(['images' => function($query) {
            $query->orderBy('order', 'asc');
        }])->paginate($perPage);

        // Calcular estadísticas de los resultados
        $stats = [
            'total_found' => $properties->total(),
            'price_range' => [
                'min' => $query->min('price_per_night') ?? 0,
                'max' => $query->max('price_per_night') ?? 0,
                'avg' => round($query->avg('price_per_night') ?? 0, 2)
            ]
        ];

        return response()->json([
            'properties' => $properties->items(),
            'pagination' => [
                'total' => $properties->total(),
                'per_page' => $properties->perPage(),
                'current_page' => $properties->currentPage(),
                'last_page' => $properties->lastPage(),
                'from' => $properties->firstItem(),
                'to' => $properties->lastItem()
            ],
            'stats' => $stats
        ]);
    }
}
