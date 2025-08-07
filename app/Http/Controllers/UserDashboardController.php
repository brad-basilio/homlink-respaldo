<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\PropertyMetric;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserDashboardController extends BasicController
{
    public $reactView = 'UserDashboard';
    public $reactRootView = 'public';

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Datos adicionales para la vista React
     */
    public function setReactViewProperties(Request $request)
    {
        $user = Auth::user();
        
        if (!$user) {
            abort(401, 'Usuario no autenticado');
        }

        // Obtener propiedades del usuario con métricas detalladas
        $properties = Property::where('user_id', $user->id)
            ->select([
                'id', 'title', 'slug', 'district', 'city', 'country',
                'price_per_night', 'currency', 'active', 'admin_approved', 
                'featured', 'created_at', 'updated_at'
            ])
            ->orderByDesc('created_at')
            ->get();

        // Agregar métricas a cada propiedad
        foreach ($properties as $property) {
            $metrics = PropertyMetric::where('property_id', $property->id)
                ->selectRaw('
                    event_type,
                    COUNT(*) as total,
                    DATE(created_at) as date
                ')
                ->groupBy(['event_type', 'date'])
                ->orderBy('date', 'desc')
                ->get();

            // Agrupar métricas por tipo de evento
            $property->metrics_summary = [
                'property_view' => $metrics->where('event_type', 'property_view')->sum('total'),
                'airbnb_click' => $metrics->where('event_type', 'airbnb_click')->sum('total'),
                'gallery_view' => $metrics->where('event_type', 'gallery_view')->sum('total'),
            ];

            // Métricas diarias (últimos 30 días)
            $property->daily_metrics = $metrics->groupBy('date')->map(function ($dayMetrics) {
                return $dayMetrics->pluck('total', 'event_type')->toArray();
            })->take(30);

            // Calcular conversión
            $totalViews = $property->metrics_summary['property_view'];
            $totalClicks = $property->metrics_summary['airbnb_click'];
            $property->conversion_rate = $totalViews > 0 ? round(($totalClicks / $totalViews) * 100, 1) : 0;
        }

        // Estadísticas generales del usuario
        $totalStats = [
            'total_properties' => $properties->count(),
            'active_properties' => $properties->where('active', true)->where('admin_approved', true)->count(),
            'pending_properties' => $properties->where('admin_approved', false)->count(),
            'featured_properties' => $properties->where('featured', true)->count(),
            'total_views' => $properties->sum('metrics_summary.property_view'),
            'total_airbnb_clicks' => $properties->sum('metrics_summary.airbnb_click'),
            'total_gallery_views' => $properties->sum('metrics_summary.gallery_view'),
        ];

        // Calcular conversión general
        $totalStats['conversion_rate'] = $totalStats['total_views'] > 0 
            ? round(($totalStats['total_airbnb_clicks'] / $totalStats['total_views']) * 100, 1) 
            : 0;

        return [
            'user' => $user,
            'properties' => $properties,
            'userStats' => $totalStats,
            'currentDate' => now()->toDateString(),
        ];
    }

    /**
     * API endpoint para obtener métricas del usuario
     */
    public function getUserMetrics(Request $request)
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json(['error' => 'No autorizado'], 401);
        }

        // ✅ CORREGIR MANEJO DE FECHAS
        $startDate = $request->get('start_date', now()->subDays(30)->toDateString());
        $endDate = $request->get('end_date', now()->toDateString());
        
        // Convertir a Carbon para manejar correctamente las fechas con horas
        $startDateTime = \Carbon\Carbon::parse($startDate)->startOfDay();
        $endDateTime = \Carbon\Carbon::parse($endDate)->endOfDay();

        // Log para debugging
        Log::info("🔍 UserDashboard getUserMetrics", [
            'user_id' => $user->id,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'start_datetime' => $startDateTime->toISOString(),
            'end_datetime' => $endDateTime->toISOString()
        ]);

        // Obtener propiedades con métricas en el período
        $properties = Property::where('user_id', $user->id)
            ->with(['metrics' => function ($query) use ($startDateTime, $endDateTime) {
                $query->whereBetween('created_at', [$startDateTime, $endDateTime]);
            }])
            ->get();

        // Procesar métricas
        $processedProperties = $properties->map(function ($property) {
            $metrics = $property->metrics->groupBy('event_type')->map->count();
            
            // Log para debugging por propiedad
            Log::info("📊 Métricas para propiedad {$property->id}", [
                'title' => $property->title,
                'total_metrics' => $property->metrics->count(),
                'metrics_by_type' => $metrics->toArray()
            ]);
            
            return [
                'id' => $property->id,
                'title' => $property->title,
                'slug' => $property->slug,
                'district' => $property->district,
                'city' => $property->city,
                'price_per_night' => $property->price_per_night,
                'currency' => $property->currency,
                'bedrooms' => $property->bedrooms,
                'bathrooms' => $property->bathrooms,
                'max_guests' => $property->max_guests,
                'area_m2' => $property->area_m2,
                'rating' => $property->rating,
                'reviews_count' => $property->reviews_count,
                'main_image' => $property->main_image,
                'gallery' => $property->gallery,
                'platform' => $property->platform,
                'active' => $property->active,
                'admin_approved' => $property->admin_approved,
                'featured' => $property->featured,
                'created_at' => $property->created_at,
                'amenities' => $property->amenities,
                'services' => $property->services,
                'characteristics' => $property->characteristics,
                'description' => $property->description,
                'external_link' => $property->external_link,
                'availability_status' => $property->availability_status,
                'metrics_summary' => [
                    'property_view' => $metrics->get('property_view', 0),
                    'airbnb_click' => $metrics->get('airbnb_click', 0),
                    'gallery_view' => $metrics->get('gallery_view', 0),
                ],
                // Calcular conversión por propiedad
                'conversion_rate' => $metrics->get('property_view', 0) > 0 
                    ? round(($metrics->get('airbnb_click', 0) / $metrics->get('property_view', 0)) * 100, 1)
                    : 0
            ];
        });

        // Métricas totales
        $totalMetrics = [
            'property_view' => $processedProperties->sum('metrics_summary.property_view'),
            'airbnb_click' => $processedProperties->sum('metrics_summary.airbnb_click'),
            'gallery_view' => $processedProperties->sum('metrics_summary.gallery_view'),
        ];

        Log::info("📈 UserDashboard totales", [
            'user_id' => $user->id,
            'total_properties' => $processedProperties->count(),
            'total_metrics' => $totalMetrics
        ]);

        return response()->json([
            'properties' => $processedProperties,
            'total_metrics' => $totalMetrics,
            'period' => [
                'start' => $startDate,
                'end' => $endDate
            ]
        ]);
    }
}
