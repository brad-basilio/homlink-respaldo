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

            Log::info('=== INICIO SUBMISSION CONTROLLER ===');
            Log::info('Datos recibidos:', $request->all());
            Log::info('Archivos recibidos:', $request->allFiles());
            Log::info('User ID:', ['user_id' => Auth::id()]);

            // Validar los datos del formulario
            $validatedData = $request->validate([
                // Información básica
                'title' => 'nullable|string|max:255',
                'property_type' => 'required|string',
                'price' => 'nullable|numeric|min:0',
                'currency' => 'nullable|string|in:PEN,USD,EUR',
                'platform' => 'nullable|string',
                
                // Ubicación
                'address' => 'required|string|max:255',
                'apartment' => 'nullable|string|max:255',
                'department' => 'required|string|max:100',
                'province' => 'required|string|max:100',
                'district' => 'required|string|max:100',
                'postal_code' => 'nullable|string|max:20',
                'external_link' => 'nullable|url',
                'area_m2' => 'nullable|numeric|min:0',
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric',
                
                // Descripción
                'description' => 'required|string|min:10',
                'short_description' => 'nullable|string|max:255',
                
                // Datos básicos
                'guests' => 'required|integer|min:1|max:20',
                'bedrooms' => 'required|integer|min:1|max:20',
                'beds' => 'required|integer|min:1|max:20',
                'bathrooms' => 'required|integer|min:1|max:20',
                
                // Información adicional
                'rating' => 'nullable|numeric|between:0,5',
                'reviews_count' => 'nullable|integer|min:0',
                
                // Arrays
                'amenities' => 'nullable|array',
                'services' => 'nullable|array',
                'characteristics' => 'nullable|array',
                'house_rules' => 'nullable|array',
                
                // Imágenes
                'main_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
                'images' => 'nullable|array',
                'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120'
            ]);

            Log::info('Datos validados exitosamente:', $validatedData);

            // Generar valores automáticos si no se proporcionan
            $title = $validatedData['title'] ?? $this->generatePropertyTitle($validatedData);
            $shortDescription = $validatedData['short_description'] ?? $this->generateShortDescription(
                $validatedData['property_type'],
                $validatedData['guests'],
                $validatedData['district']
            );
            
            // Generar slug único
            $baseSlug = Str::slug($title);
            $slug = $baseSlug;
            $counter = 1;
            
            while (Property::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }

            // Procesar todos los arrays de datos
            $amenities = $this->processAmenities($validatedData['amenities'] ?? []);
            $services = $this->processServices($validatedData['services'] ?? []);
            $characteristics = $this->processCharacteristics($validatedData['characteristics'] ?? []);
            $houseRules = $this->processHouseRules($validatedData['house_rules'] ?? []);

            // Crear la propiedad
            Log::info('Creando propiedad con los siguientes datos:', [
                'user_id' => Auth::id(),
                'title' => $title,
                'slug' => $slug,
                'platform' => $validatedData['platform'] ?? 'Airbnb',
                'property_type' => $validatedData['property_type'],
                'price_per_night' => $validatedData['price'] ?? null,
                'currency' => $validatedData['currency'] ?? 'PEN',
                'area_m2' => $validatedData['area_m2'] ?? null,
                'latitude' => $validatedData['latitude'] ?? null,
                'longitude' => $validatedData['longitude'] ?? null,
                'address' => $validatedData['address'],
                'apartment' => $validatedData['apartment'] ?? null,
                'department' => $validatedData['department'],
                'province' => $validatedData['province'],
                'district' => $validatedData['district'],
                'postal_code' => $validatedData['postal_code'] ?? null,
                'bedrooms' => $validatedData['bedrooms'],
                'beds' => $validatedData['beds'],
                'bathrooms' => $validatedData['bathrooms'],
                'max_guests' => $validatedData['guests'],
                'description' => $validatedData['description'],
                'short_description' => $shortDescription,
                'rating' => $validatedData['rating'] ?? null,
                'reviews_count' => $validatedData['reviews_count'] ?? 0,
                'external_link' => $validatedData['external_link'] ?? null,
                'amenities' => $amenities,
                'services' => $services,
                'characteristics' => $characteristics,
                'house_rules' => $houseRules,
            ]);

            $property = Property::create([
                'user_id' => Auth::id(),
                'title' => $title,
                'slug' => $slug,
                'platform' => $validatedData['platform'] ?? 'Airbnb',
                'property_type' => $validatedData['property_type'],
                'price_per_night' => $validatedData['price'] ?? null,
                'currency' => $validatedData['currency'] ?? 'PEN',
                'area_m2' => $validatedData['area_m2'] ?? null,
                'latitude' => $validatedData['latitude'] ?? null,
                'longitude' => $validatedData['longitude'] ?? null,
                'address' => $validatedData['address'],
                'apartment' => $validatedData['apartment'] ?? null,
                'department' => $validatedData['department'],
                'province' => $validatedData['province'],
                'district' => $validatedData['district'],
                'postal_code' => $validatedData['postal_code'] ?? null, // ✅ AGREGADO: Campo postal_code
                'country' => 'Perú',
                'bedrooms' => $validatedData['bedrooms'],
                'beds' => $validatedData['beds'],
                'bathrooms' => $validatedData['bathrooms'],
                'max_guests' => $validatedData['guests'],
                'description' => $validatedData['description'],
                'short_description' => $shortDescription,
                'rating' => $validatedData['rating'] ?? null,
                'reviews_count' => $validatedData['reviews_count'] ?? 0,
                'external_link' => $validatedData['external_link'] ?? null,
                'amenities' => $amenities,
                'services' => $services,
                'characteristics' => $characteristics,
                'house_rules' => $houseRules,
                'active' => true,
                'admin_approved' => false, // Requiere aprobación del admin
                'featured' => false,
                'availability_status' => 'available'
            ]);

            Log::info('Propiedad creada exitosamente:', [
                'property_id' => $property->id,
                'title' => $property->title,
                'all_data' => $property->toArray()
            ]);

            // Procesar imagen principal si se subió
            if ($request->hasFile('main_image')) {
                Log::info('Procesando imagen principal');
                $this->processMainImage($request->file('main_image'), $property);
            }

            // Procesar imágenes de galería si se subieron
            if ($request->hasFile('images')) {
                Log::info('Procesando imágenes de galería');
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

    // Procesar servicios
    private function processServices($servicesData)
    {
        $services = [];
        
        if (is_array($servicesData)) {
            foreach ($servicesData as $service) {
                if (is_string($service)) {
                    $services[] = $service;
                }
            }
        }

        return $services;
    }

    // Procesar características
    private function processCharacteristics($characteristicsData)
    {
        $characteristics = [];
        
        if (is_array($characteristicsData)) {
            foreach ($characteristicsData as $characteristic) {
                if (is_string($characteristic)) {
                    $characteristics[] = $characteristic;
                }
            }
        }

        return $characteristics;
    }

    // Procesar reglas de la casa
    private function processHouseRules($houseRulesData)
    {
        $houseRules = [];
        
        if (is_array($houseRulesData)) {
            foreach ($houseRulesData as $rule) {
                if (is_string($rule)) {
                    $houseRules[] = $rule;
                }
            }
        }

        return $houseRules;
    }

    // Generar descripción corta
    private function generateShortDescription($propertyType, $guests, $district)
    {
        return "Cómodo {$propertyType} para {$guests} huéspedes en {$district}";
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

    private function processMainImage($mainImage, $property)
    {
        try {
            Log::info('Procesando imagen principal:', [
                'original_name' => $mainImage->getClientOriginalName(),
                'size' => $mainImage->getSize(),
                'mime_type' => $mainImage->getMimeType()
            ]);

            // Generar UUID y extensión
            $uuid = Str::uuid();
            $ext = $mainImage->getClientOriginalExtension();
            $fileName = "{$uuid}.{$ext}";
            
            // Guardar en la estructura correcta: storage/app/images/property/
            $path = "images/property/{$fileName}";
            Storage::put($path, file_get_contents($mainImage));
            
            Log::info('Imagen principal guardada:', [
                'path' => $path,
                'fileName' => $fileName
            ]);
            
            // Actualizar la propiedad con la imagen principal
            $property->update([
                'main_image' => $fileName
            ]);
            
            Log::info('Propiedad actualizada con imagen principal:', [
                'property_id' => $property->id,
                'main_image' => $fileName
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error procesando imagen principal:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    private function processImages($images, $property)
    {
        try {
            Log::info('Procesando imágenes de galería:', [
                'count' => count($images)
            ]);

            $galleryPaths = [];

            foreach ($images as $index => $image) {
                Log::info("Procesando imagen de galería {$index}:", [
                    'original_name' => $image->getClientOriginalName(),
                    'size' => $image->getSize(),
                    'mime_type' => $image->getMimeType()
                ]);

                // Generar UUID y extensión
                $uuid = Str::uuid();
                $ext = $image->getClientOriginalExtension();
                $fileName = "{$uuid}.{$ext}";
                
                // Guardar en la estructura correcta: storage/app/images/property/
                $path = "images/property/{$fileName}";
                Storage::put($path, file_get_contents($image));
                
                $galleryPaths[] = $fileName; // Solo el nombre del archivo con UUID
                
                Log::info("Imagen de galería {$index} guardada:", [
                    'path' => $path,
                    'fileName' => $fileName
                ]);
            }

            // Actualizar la propiedad solo con la galería (no tocar main_image)
            $property->update([
                'gallery' => $galleryPaths
            ]);
            
            Log::info('Propiedad actualizada con galería:', [
                'property_id' => $property->id,
                'gallery_count' => count($galleryPaths)
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error procesando imágenes de galería:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }
}
