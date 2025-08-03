<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PropertyController extends BasicController
{
    public $model = Property::class;
    public $reactView = 'Admin/Properties';
    public $imageFields = ['main_image'];

    public function setPaginationInstance(string $model)
    {
        return $model::orderBy('created_at', 'desc');
    }

    // ✅ AGREGADO: Método para aprobar propiedades
    public function approve(Request $request)
    {
        try {
            $property = Property::findOrFail($request->id);
            $property->update(['admin_approved' => true]);

            return response()->json([
                'status' => 200,
                'message' => 'Propiedad aprobada exitosamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 400,
                'message' => 'Error al aprobar la propiedad: ' . $e->getMessage()
            ], 400);
        }
    }

    // ✅ AGREGADO: Método para rechazar propiedades
    public function reject(Request $request)
    {
        try {
            $property = Property::findOrFail($request->id);
            $property->update(['admin_approved' => false]);

            return response()->json([
                'status' => 200,
                'message' => 'Propiedad rechazada'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 400,
                'message' => 'Error al rechazar la propiedad: ' . $e->getMessage()
            ], 400);
        }
    }

    public function beforeSave(Request $request)
    {
        $body = $request->all();

        // Debug para ver qué datos estamos recibiendo
        Log::info('PropertyController beforeSave - Request data:', [
            'all_data' => $request->all(),
            'files' => $request->allFiles(),
            'has_gallery' => $request->hasFile('gallery'),
            'gallery_files' => $request->file('gallery')
        ]);

        // Procesar galería de imágenes
        $gallery = [];
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $uuid = Str::uuid();
                $ext = $file->getClientOriginalExtension();
                $path = "images/property/{$uuid}.{$ext}";
                Storage::put($path, file_get_contents($file));
                $gallery[] = "{$uuid}.{$ext}";
            }
        }

        // Mantener imágenes existentes
        if ($request->has('existing_gallery')) {
            $existing = json_decode($request->existing_gallery, true);
            if (is_array($existing)) {
                $gallery = array_merge($gallery, $existing);
            }
        }

        $body['gallery'] = $gallery;

        // Procesar amenidades
        $processedAmenities = [];
        if ($request->has('amenities')) {
            $amenities = $request->amenities;
            foreach ($amenities as $index => $amenity) {
                $name = trim($amenity['name'] ?? '');
                $icon = trim($amenity['icon'] ?? '');
                $available = isset($amenity['available']) ? filter_var($amenity['available'], FILTER_VALIDATE_BOOLEAN) : false;

                if ($name) {
                    $processedAmenities[] = [
                        'name' => $name,
                        'icon' => $icon,
                        'available' => $available
                    ];
                }
            }
        }
        $body['amenities'] = $processedAmenities;

        // ✅ AGREGADO: Procesar amenidades personalizadas (amenities_custom)
        $processedCustomAmenities = [];
        if ($request->has('amenities_custom')) {
            $customAmenities = $request->amenities_custom;
            foreach ($customAmenities as $index => $amenity) {
                $name = trim($amenity['name'] ?? '');
                $icon = trim($amenity['icon'] ?? '');
                $available = isset($amenity['available']) ? filter_var($amenity['available'], FILTER_VALIDATE_BOOLEAN) : false;

                if ($name) {
                    $processedCustomAmenities[] = [
                        'name' => $name,
                        'icon' => $icon,
                        'available' => $available
                    ];
                }
            }
        }
        $body['amenities_custom'] = $processedCustomAmenities;

        // Procesar servicios
        $processedServices = [];
        if ($request->has('services')) {
            $services = $request->services;
            foreach ($services as $index => $service) {
                $name = trim($service['name'] ?? '');
                $description = trim($service['description'] ?? '');
                $icon = trim($service['icon'] ?? '');
                $available = isset($service['available']) ? filter_var($service['available'], FILTER_VALIDATE_BOOLEAN) : false;

                if ($name) {
                    $processedServices[] = [
                        'name' => $name,
                        'description' => $description,
                        'icon' => $icon,
                        'available' => $available
                    ];
                }
            }
        }
        $body['services'] = $processedServices;

        // Procesar características
        $processedCharacteristics = [];
        if ($request->has('characteristics')) {
            $characteristics = $request->characteristics;
            foreach ($characteristics as $index => $characteristic) {
                $name = trim($characteristic['name'] ?? '');
                $value = trim($characteristic['value'] ?? '');
                $icon = trim($characteristic['icon'] ?? '');

                if ($name) {
                    $processedCharacteristics[] = [
                        'name' => $name,
                        'value' => $value,
                        'icon' => $icon
                    ];
                }
            }
        }
        $body['characteristics'] = $processedCharacteristics;

        // Procesar reglas de la casa
        $processedHouseRules = [];
        if ($request->has('house_rules')) {
            $houseRules = $request->house_rules;
            foreach ($houseRules as $rule) {
                $text = trim($rule['text'] ?? '');
                if ($text) {
                    $processedHouseRules[] = [
                        'text' => $text,
                        'icon' => $rule['icon'] ?? 'fas fa-info-circle'
                    ];
                }
            }
        }
        $body['house_rules'] = $processedHouseRules;

        // Procesar información de check-in
        $checkInInfo = [];
        if ($request->has('check_in_info')) {
            $checkInData = $request->check_in_info;
            $checkInInfo = [
                'check_in_time' => $checkInData['check_in_time'] ?? '15:00',
                'check_out_time' => $checkInData['check_out_time'] ?? '11:00',
                'instructions' => $checkInData['instructions'] ?? '',
                'contact_info' => $checkInData['contact_info'] ?? ''
            ];
        }
        $body['check_in_info'] = $checkInInfo;

        // Log del body procesado
        Log::info('PropertyController beforeSave - Processed body:', $body);

        // ✅ AGREGADO: Propiedades creadas desde admin se aprueban automáticamente
        if (!isset($body['id']) || empty($body['id'])) {
            $body['admin_approved'] = true; // Nueva propiedad desde admin = aprobada
        }

        return $body;
    }

    public function afterSave(Request $request, $property, ?bool $isNew)
    {
        // Log adicional para verificar qué se guardó
        Log::info('PropertyController afterSave - Property saved:', [
            'property_id' => $property->id,
            'isNew' => $isNew,
            'property_data' => $property->toArray()
        ]);

        return $property;
    }

    // Método adicional para obtener propiedades públicas (para frontend)
    public function getPublicProperties(Request $request)
    {
        // ✅ CORREGIDO: Solo propiedades activas Y aprobadas por admin
        $query = Property::active()->approved();

        // Filtros
        if ($request->has('platform')) {
            $query->where('platform', $request->platform);
        }

        if ($request->has('district')) {
            $query->where('district', 'LIKE', '%' . $request->district . '%');
        }

        if ($request->has('min_price') && $request->has('max_price')) {
            $query->priceRange($request->min_price, $request->max_price);
        }

        if ($request->has('guests')) {
            $query->forGuests($request->guests);
        }

        if ($request->has('bedrooms')) {
            $query->withBedrooms($request->bedrooms);
        }

        // Filtros de amenidades
        if ($request->has('amenities')) {
            $amenities = $request->amenities;
            foreach ($amenities as $amenity) {
                $query->whereJsonContains('amenities', ['name' => $amenity, 'available' => true]);
            }
        }

        $properties = $query->paginate(12);

        return response()->json($properties);
    }

    // ✅ AGREGADO: Método para obtener estadísticas de ubicaciones para el mapa
    public function getLocationStats()
    {
        try {
            $locationStats = Property::active()
                ->approved()
                ->selectRaw('department, province, district, COUNT(*) as count, AVG(latitude) as avg_lat, AVG(longitude) as avg_lng')
                ->whereNotNull('latitude')
                ->whereNotNull('longitude')
                ->groupBy('department', 'province', 'district')
                ->orderByDesc('count')
                ->get();

            // Calcular el centro basado en la ubicación con más propiedades
            $centerLocation = null;
            if ($locationStats->isNotEmpty()) {
                $topLocation = $locationStats->first();
                $centerLocation = [
                    'lat' => (float) $topLocation->avg_lat,
                    'lng' => (float) $topLocation->avg_lng,
                    'location' => $topLocation->district . ', ' . $topLocation->province,
                    'count' => $topLocation->count
                ];
            }

            return response()->json([
                'success' => true,
                'center' => $centerLocation,
                'locations' => $locationStats,
                'total_properties' => Property::active()->approved()->count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener estadísticas de ubicación',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
