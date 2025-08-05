<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\PropertyMetric;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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

        $startDate = $request->get('start_date', now()->subDays(30));
        $endDate = $request->get('end_date', now());

        // Obtener propiedades con métricas en el período
        $properties = Property::where('user_id', $user->id)
            ->with(['metrics' => function ($query) use ($startDate, $endDate) {
                $query->whereBetween('created_at', [$startDate, $endDate]);
            }])
            ->get();

        // Procesar métricas
        $processedProperties = $properties->map(function ($property) {
            $metrics = $property->metrics->groupBy('event_type')->map->count();
            
            return [
                'id' => $property->id,
                'title' => $property->title,
                'slug' => $property->slug,
                'district' => $property->district,
                'city' => $property->city,
                'active' => $property->active,
                'admin_approved' => $property->admin_approved,
                'featured' => $property->featured,
                'created_at' => $property->created_at,
                'metrics' => [
                    'property_view' => $metrics->get('property_view', 0),
                    'airbnb_click' => $metrics->get('airbnb_click', 0),
                    'gallery_view' => $metrics->get('gallery_view', 0),
                ]
            ];
        });

        // Métricas totales
        $totalMetrics = [
            'property_view' => $processedProperties->sum('metrics.property_view'),
            'airbnb_click' => $processedProperties->sum('metrics.airbnb_click'),
            'gallery_view' => $processedProperties->sum('metrics.gallery_view'),
        ];

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
