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
        'user_id',
        'title',
        'slug',
        'platform',
        'price_per_night',
        'currency',
        'address',
        'postal_code',
        'department',
        'province',
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
        'external_link',
        'short_description',
        'main_image',
        'gallery',
        'amenities',
        'amenities_custom',
        'services',
        'characteristics',
        'house_rules',
        'check_in_info',
        'rating',
        'reviews_count',
        'active',
        'featured',
        'admin_approved',
        'availability_status'
    ];

    protected $casts = [
        'gallery' => 'array',
        'amenities' => 'array',
        'amenities_custom' => 'array',
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
        'admin_approved' => 'boolean',
    ];

    // Accessor para la imagen principal
    public function getMainImageUrlAttribute()
    {
        return $this->main_image ? asset('storage/images/property/' . $this->main_image) : null;
    }

    // Accessor para generar slug si no existe
    public function getSlugAttribute($value)
    {
        return $value ?: $this->id;
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

    // Scope para propiedades aprobadas por el administrador
    public function scopeApproved($query)
    {
        return $query->where('admin_approved', true);
    }

    // Scope para propiedades pendientes de aprobación
    public function scopePendingApproval($query)
    {
        return $query->where('admin_approved', false);
    }

    // Relación con el usuario que creó la propiedad
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
