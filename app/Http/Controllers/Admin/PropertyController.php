<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\Crypto;
use SoDe\Extend\Response;

class PropertyController extends BasicController
{
    public $model = Property::class;
    public $reactView = 'Admin/Properties';
    public $imageFields = ['main_image'];

    public function setPaginationInstance(string $model)
    {
        return $model::orderBy('created_at', 'desc');
    }

    public function beforeSave(Request $request)
    {
        $body = $request->all();

        // Procesar galería de imágenes
        $gallery = [];
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $uuid = Crypto::randomUUID();
                $ext = $file->getClientOriginalExtension();
                $path = "images/property/{$uuid}.{$ext}";
                Storage::put($path, file_get_contents($file));
                $gallery[] = "{$uuid}.{$ext}";
            }
        }

        // Mantener imágenes existentes
        if ($request->has('existing_gallery')) {
            $existing = json_decode($request->existing_gallery, true);
            $gallery = array_merge($gallery, $existing);
        }

        $body['gallery'] = $gallery;

        // Procesar amenidades
        $processedAmenities = [];
        if ($request->has('amenities')) {
            $amenities = $request->amenities;
            foreach ($amenities as $index => $amenity) {
                $name = trim($amenity['name'] ?? '');
                $icon = trim($amenity['icon'] ?? '');
                $available = $amenity['available'] ?? false;

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

        // Procesar servicios
        $processedServices = [];
        if ($request->has('services')) {
            $services = $request->services;
            foreach ($services as $index => $service) {
                $name = trim($service['name'] ?? '');
                $description = trim($service['description'] ?? '');
                $icon = trim($service['icon'] ?? '');
                $available = $service['available'] ?? false;

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

        return $body;
    }

    public function afterSave(Request $request, $property, ?bool $isNew)
    {
        return $property;
    }

    // Método adicional para obtener propiedades públicas (para frontend)
    public function getPublicProperties(Request $request)
    {
        $query = Property::active();

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

        return Response::success($properties);
    }
}
