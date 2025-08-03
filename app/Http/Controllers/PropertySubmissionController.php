<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PropertySubmissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Request $request)
    {
        try {
            // Validar que el usuario esté autenticado
            if (!Auth::check()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Debes estar logueado para anunciar una propiedad'
                ], 401);
            }

            // Validar los datos del formulario
            $validatedData = $request->validate([
                'property_type' => 'required|string',
                'address' => 'required|string|max:255',
                'apartment' => 'nullable|string|max:255',
                'district' => 'required|string|max:100',
                'postal_code' => 'nullable|string|max:20',
                'province' => 'required|string|max:100',
                'department' => 'required|string|max:100',
                'link' => 'nullable|url',
                'external_link' => 'nullable|url',
                'description' => 'required|string|min:10',
                'guests' => 'required|integer|min:1|max:20',
                'bedrooms' => 'required|integer|min:1|max:20',
                'beds' => 'required|integer|min:1|max:20',
                'bathrooms' => 'required|integer|min:1|max:20',
                'amenities' => 'nullable|array',
                'amenities_custom' => 'nullable|array', // ✅ AGREGADO: Validación para amenidades custom
                'images' => 'nullable|array',
                'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120' // 5MB y soporte WEBP
            ]);

            // Generar título basado en el tipo de propiedad y ubicación
            $title = $this->generatePropertyTitle($validatedData);
            
            // Generar slug único
            $baseSlug = Str::slug($title);
            $slug = $baseSlug;
            $counter = 1;
            
            while (Property::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }

            // Procesar amenidades
            $amenities = $this->processAmenities($validatedData['amenities'] ?? []);
            $customAmenities = $this->processCustomAmenities($validatedData['amenities_custom'] ?? []); // ✅ AGREGADO

            // Crear la propiedad
            $property = Property::create([
                'user_id' => Auth::id(),
                'title' => $title,
                'slug' => $slug,
                'platform' => 'Airbnb', // ✅ CORREGIDO: Siempre Airbnb
                'address' => $validatedData['address'],
                'apartment' => $validatedData['apartment'] ?? null,
                'department' => $validatedData['department'],
                'province' => $validatedData['province'],
                'district' => $validatedData['district'],
                'postal_code' => $validatedData['postal_code'] ?? null, // ✅ AGREGADO: Campo postal_code
                'country' => 'Perú',
                'bedrooms' => $validatedData['bedrooms'],
                'bathrooms' => $validatedData['bathrooms'],
                'max_guests' => $validatedData['guests'],
                'description' => $validatedData['description'],
                'external_link' => $validatedData['external_link'] ?? $validatedData['link'] ?? null,
                'short_description' => Str::limit($validatedData['description'], 150),
                'amenities' => $amenities,
                'amenities_custom' => $customAmenities, // ✅ AGREGADO: Amenidades personalizadas
                'active' => true,
                'admin_approved' => false, // Requiere aprobación del admin
                'featured' => false,
                'availability_status' => 'available'
            ]);

            // Procesar imágenes si se subieron
            if ($request->hasFile('images')) {
                $this->processImages($request->file('images'), $property);
            }

            return response()->json([
                'success' => true,
                'message' => 'Propiedad enviada exitosamente. Será revisada por nuestro equipo antes de ser publicada.',
                'property_id' => $property->id
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error in property submission', [
                'errors' => $e->errors(),
                'data' => $request->all()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error creating property', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->all()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error interno del servidor: ' . $e->getMessage()
            ], 500);
        }
    }

    private function generatePropertyTitle($data)
    {
        $typeMap = [
            'casa' => 'Casa completa',
            'habitacion' => 'Habitación privada',
            'compartida' => 'Habitación compartida',
            'otros' => 'Alojamiento'
        ];

        $type = $typeMap[$data['property_type']] ?? 'Propiedad';
        return "{$type} en {$data['district']}, {$data['province']}";
    }

    private function processAmenities($amenitiesData)
    {
        $amenities = [];
        
        if (is_array($amenitiesData)) {
            foreach ($amenitiesData as $amenity) {
                if (is_string($amenity)) {
                    // Amenidades predefinidas (solo IDs)
                    $amenities[] = $amenity;
                }
            }
        }

        return $amenities;
    }

    // ✅ AGREGADO: Procesar amenidades personalizadas
    private function processCustomAmenities($customAmenitiesData)
    {
        $customAmenities = [];
        
        if (is_array($customAmenitiesData)) {
            foreach ($customAmenitiesData as $amenity) {
                if (is_array($amenity) && !empty($amenity['name'])) {
                    $customAmenities[] = [
                        'name' => trim($amenity['name']),
                        'icon' => trim($amenity['icon'] ?? 'fas fa-check'),
                        'available' => filter_var($amenity['available'] ?? true, FILTER_VALIDATE_BOOLEAN)
                    ];
                }
            }
        }

        return $customAmenities;
    }

    private function processImages($images, $property)
    {
        $galleryPaths = [];
        $mainImagePath = null;

        foreach ($images as $index => $image) {
            // ✅ CORREGIDO: Seguir la estructura del BasicController
            $uuid = Str::uuid();
            $ext = $image->getClientOriginalExtension();
            $fileName = "{$uuid}.{$ext}";
            
            // Guardar en la estructura correcta: storage/app/images/property/
            $path = "images/property/{$fileName}";
            Storage::put($path, file_get_contents($image));
            
            if ($index === 0) {
                $mainImagePath = $fileName; // Solo el nombre del archivo con UUID
            }
            
            $galleryPaths[] = $fileName; // Solo el nombre del archivo con UUID
        }

        // Actualizar la propiedad con las imágenes
        $property->update([
            'main_image' => $mainImagePath,
            'gallery' => $galleryPaths
        ]);
    }
}
