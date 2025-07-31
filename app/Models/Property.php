<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory,HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';


    protected $fillable = [
        'title',
        'platform',
        'price_per_night',
        'currency',
        'address',
        'district',
        'city',
        'country',
        'latitude',
        'longitude',
        'bedrooms',
        'bathrooms',
        'max_guests',
        'area_m2',
        'description',
        'short_description',
        'main_image',
        'gallery',
        'amenities',
        'services',
        'characteristics',
        'house_rules',
        'check_in_info',
        'rating',
        'reviews_count',
        'active',
        'featured',
        'availability_status'
    ];

    protected $casts = [
        'gallery' => 'array',
        'amenities' => 'array',
        'services' => 'array',
        'characteristics' => 'array',
        'house_rules' => 'array',
        'check_in_info' => 'array',
        'price_per_night' => 'decimal:2',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'rating' => 'decimal:1',
        'active' => 'boolean',
        'featured' => 'boolean',
    ];

    // Accessor para la imagen principal
    public function getMainImageUrlAttribute()
    {
        return $this->main_image ? asset('storage/images/property/' . $this->main_image) : null;
    }

    // Accessor para la galería
    public function getGalleryUrlsAttribute()
    {
        if (!$this->gallery) return [];
        
        return collect($this->gallery)->map(function ($image) {
            return asset('storage/images/property/' . $image);
        })->toArray();
    }

    // Scope para propiedades activas
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    // Scope para propiedades destacadas
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    // Scope para filtrar por precio
    public function scopePriceRange($query, $min, $max)
    {
        return $query->whereBetween('price_per_night', [$min, $max]);
    }

    // Scope para filtrar por huéspedes
    public function scopeForGuests($query, $guests)
    {
        return $query->where('max_guests', '>=', $guests);
    }

    // Scope para filtrar por dormitorios
    public function scopeWithBedrooms($query, $bedrooms)
    {
        return $query->where('bedrooms', '>=', $bedrooms);
    }
}
