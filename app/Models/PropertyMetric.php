<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

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
        'property_detail_view' => 'Visualización de detalle',
        'property_card_click' => 'Click en tarjeta',
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
     * Método estático para registrar una métrica (CON CONTROL DE DUPLICADOS)
     */
    public static function track($propertyId, $eventType, $metadata = [])
    {
        $request = request();
        $userIp = $request->ip();
        $userAgent = $request->userAgent();
        
        // ✅ CONTROL DE DUPLICADOS BASADO EN SESIÓN Y METADATA
        $sessionControlled = $metadata['session_controlled'] ?? false;
        
        if ($sessionControlled) {
            // Para eventos controlados por sesión, verificar duplicados en un período corto
            $timeWindow = now()->subMinutes(5); // Ventana de 5 minutos
            
            $existingMetric = self::where('property_id', $propertyId)
                ->where('event_type', $eventType)
                ->where('user_ip', $userIp)
                ->where('user_agent', $userAgent)
                ->where('created_at', '>=', $timeWindow)
                ->first();
                
            if ($existingMetric) {
                Log::info("🚫 Métrica duplicada detectada y bloqueada", [
                    'property_id' => $propertyId,
                    'event_type' => $eventType,
                    'user_ip' => $userIp,
                    'existing_metric_id' => $existingMetric->id,
                    'existing_created_at' => $existingMetric->created_at,
                    'metadata' => $metadata
                ]);
                
                return $existingMetric; // Retornar el existente, no crear uno nuevo
            }
        }
        
        // Si no existe duplicado, crear nuevo registro
        $newMetric = self::create([
            'property_id' => $propertyId,
            'event_type' => $eventType,
            'user_ip' => $userIp,
            'user_agent' => $userAgent,
            'referrer' => $request->header('referer'),
            'metadata' => $metadata,
            'created_at' => now()
        ]);
        
        Log::info("✅ Nueva métrica registrada", [
            'metric_id' => $newMetric->id,
            'property_id' => $propertyId,
            'event_type' => $eventType,
            'user_ip' => $userIp,
            'session_controlled' => $sessionControlled
        ]);
        
        return $newMetric;
    }
}
