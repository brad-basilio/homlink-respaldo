<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyMetric extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'event_type',
        'user_ip',
        'user_agent',
        'referrer',
        'metadata'
    ];

    protected $casts = [
        'metadata' => 'array',
        'created_at' => 'datetime',
    ];

    public $timestamps = true;

    // Tipos de eventos disponibles
    const EVENT_TYPES = [
        'property_view' => 'Visualización',
        'airbnb_click' => 'Click en Airbnb',
        'whatsapp_click' => 'Click en WhatsApp',
        'phone_click' => 'Click en Teléfono',
        'share' => 'Compartir',
        'gallery_view' => 'Ver galería completa',
        'map_view' => 'Ver mapa',
        'contact_form' => 'Formulario de contacto'
    ];

    /**
     * Relación con la propiedad
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * Scope para filtrar por tipo de evento
     */
    public function scopeOfType($query, $eventType)
    {
        return $query->where('event_type', $eventType);
    }

    /**
     * Scope para filtrar por rango de fechas
     */
    public function scopeBetweenDates($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }

    /**
     * Método estático para registrar una métrica
     */
    public static function track($propertyId, $eventType, $metadata = [])
    {
        $request = request();
        
        return self::create([
            'property_id' => $propertyId,
            'event_type' => $eventType,
            'user_ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'referrer' => $request->header('referer'),
            'metadata' => $metadata,
            'created_at' => now()
        ]);
    }
}
