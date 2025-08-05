<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\PropertyMetric;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PropertyMetricsController extends Controller
{
    /**
     * Registrar un evento de métrica
     */
    public function track(Request $request)
    {
        $request->validate([
            'property_id' => 'required|exists:properties,id',
            'event_type' => 'required|in:' . implode(',', array_keys(PropertyMetric::EVENT_TYPES)),
            'metadata' => 'nullable|array'
        ]);

        try {
            $propertyId = $request->property_id;
            $eventType = $request->event_type;
            
            // ✅ CONTROL DE SESIÓN PARA EVITAR MÚLTIPLES VISTAS DE LA MISMA PROPIEDAD
            // Solo para eventos que deben ser únicos por sesión
            $sessionControlledEvents = ['property_detail_view', 'property_view', 'gallery_view'];
            
            if (in_array($eventType, $sessionControlledEvents)) {
                $sessionKey = "property_metric_{$eventType}_{$propertyId}";
                
                // Verificar si ya se registró en esta sesión
                if (session()->has($sessionKey)) {
                    Log::info("🔒 Métrica ya registrada en esta sesión", [
                        'property_id' => $propertyId,
                        'event_type' => $eventType,
                        'session_id' => session()->getId(),
                        'previous_timestamp' => session($sessionKey),
                        'user_id' => Auth::id() ?? 'guest'
                    ]);
                    
                    return response()->json([
                        'success' => true, 
                        'message' => 'Métrica ya registrada en esta sesión',
                        'duplicated' => true
                    ]);
                }
                
                // Marcar como registrado en la sesión actual
                session([$sessionKey => now()->toISOString()]);
                
                Log::info("✅ Nueva métrica registrada para la sesión", [
                    'property_id' => $propertyId,
                    'event_type' => $eventType,
                    'session_id' => session()->getId(),
                    'timestamp' => now()->toISOString(),
                    'user_id' => Auth::id() ?? 'guest'
                ]);
            }

            // Registrar la métrica en la base de datos
            PropertyMetric::track(
                $propertyId,
                $eventType,
                array_merge($request->metadata ?? [], [
                    'session_id' => session()->getId(),
                    'user_id' => Auth::id(),
                    'ip_address' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                    'session_controlled' => in_array($eventType, $sessionControlledEvents)
                ])
            );

            return response()->json(['success' => true, 'duplicated' => false]);
        } catch (\Exception $e) {
            Log::error("❌ Error registrando métrica", [
                'property_id' => $request->property_id ?? null,
                'event_type' => $request->event_type ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Obtener métricas para una propiedad específica
     */
    public function getPropertyMetrics(Request $request, $propertyId)
    {
        $property = Property::findOrFail($propertyId);

        // Verificar que el usuario tenga acceso a ver estas métricas
        if (!Auth::user()->can('Admin') && $property->user_id !== Auth::id()) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $startDate = $request->get('start_date', now()->subDays(30));
        $endDate = $request->get('end_date', now());

        // Métricas generales
        $totalMetrics = $property->metrics()
            ->betweenDates($startDate, $endDate)
            ->selectRaw('event_type, COUNT(*) as count')
            ->groupBy('event_type')
            ->pluck('count', 'event_type')
            ->toArray();

        // Métricas por día
        $dailyMetrics = $property->metrics()
            ->betweenDates($startDate, $endDate)
            ->selectRaw('DATE(created_at) as date, event_type, COUNT(*) as count')
            ->groupBy(['date', 'event_type'])
            ->orderBy('date')
            ->get()
            ->groupBy('date')
            ->map(function ($dayMetrics) {
                return $dayMetrics->pluck('count', 'event_type')->toArray();
            });

        // Métricas por hora (últimas 24 horas)
        $hourlyMetrics = $property->metrics()
            ->where('created_at', '>=', now()->subDay())
            ->selectRaw('HOUR(created_at) as hour, event_type, COUNT(*) as count')
            ->groupBy(['hour', 'event_type'])
            ->orderBy('hour')
            ->get()
            ->groupBy('hour')
            ->map(function ($hourMetrics) {
                return $hourMetrics->pluck('count', 'event_type')->toArray();
            });

        // Top referrers
        $topReferrers = $property->metrics()
            ->betweenDates($startDate, $endDate)
            ->whereNotNull('referrer')
            ->selectRaw('referrer, COUNT(*) as count')
            ->groupBy('referrer')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        return response()->json([
            'property' => $property->only(['id', 'title', 'slug']),
            'summary' => $totalMetrics,
            'daily' => $dailyMetrics,
            'hourly' => $hourlyMetrics,
            'referrers' => $topReferrers,
            'period' => [
                'start' => $startDate,
                'end' => $endDate
            ]
        ]);
    }

    /**
     * Obtener dashboard de métricas para el usuario
     */
    public function getUserDashboard(Request $request)
    {
        $user = Auth::user();
        $startDate = $request->get('start_date', now()->subDays(30));
        $endDate = $request->get('end_date', now());

        // Obtener propiedades del usuario
        $properties = $user->properties()->with(['metrics' => function ($query) use ($startDate, $endDate) {
            $query->betweenDates($startDate, $endDate);
        }])->get();

        // Calcular métricas totales del usuario
        $totalMetrics = PropertyMetric::whereIn('property_id', $properties->pluck('id'))
            ->betweenDates($startDate, $endDate)
            ->selectRaw('event_type, COUNT(*) as count')
            ->groupBy('event_type')
            ->pluck('count', 'event_type')
            ->toArray();

        // Métricas por propiedad
        $propertiesWithMetrics = $properties->map(function ($property) {
            $metrics = $property->metrics->groupBy('event_type')->map->count();
            return [
                'id' => $property->id,
                'title' => $property->title,
                'slug' => $property->slug,
                'active' => $property->active,
                'admin_approved' => $property->admin_approved,
                'featured' => $property->featured,
                'metrics' => $metrics->toArray()
            ];
        });

        return response()->json([
            'total_metrics' => $totalMetrics,
            'properties' => $propertiesWithMetrics,
            'period' => [
                'start' => $startDate,
                'end' => $endDate
            ]
        ]);
    }

    /**
     * Obtener dashboard de administrador
     */
    public function getAdminDashboard(Request $request)
    {
        // Solo para administradores
        if (!Auth::user()->can('Admin')) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $startDate = $request->get('start_date', now()->subDays(30));
        $endDate = $request->get('end_date', now());

        // Métricas globales
        $globalMetrics = PropertyMetric::betweenDates($startDate, $endDate)
            ->selectRaw('event_type, COUNT(*) as count')
            ->groupBy('event_type')
            ->pluck('count', 'event_type')
            ->toArray();

        // Top propiedades más vistas con información del usuario
        $topProperties = Property::withCount(['metrics as views_count' => function ($query) use ($startDate, $endDate) {
                $query->where('event_type', 'property_view')->betweenDates($startDate, $endDate);
            }])
            ->with(['user:id,name,email'])
            ->select(['id', 'title', 'slug', 'user_id', 'district', 'city', 'price_per_night', 'currency'])
            ->orderByDesc('views_count')
            ->limit(10)
            ->get()
            ->map(function ($property) {
                return [
                    'id' => $property->id,
                    'title' => $property->title,
                    'slug' => $property->slug,
                    'district' => $property->district,
                    'city' => $property->city,
                    'price_per_night' => $property->price_per_night,
                    'currency' => $property->currency,
                    'user_id' => $property->user_id,
                    'user_name' => $property->user->name ?? null,
                    'user_email' => $property->user->email ?? null,
                    'views_count' => $property->views_count
                ];
            });

        // Métricas por día
        $dailyMetrics = PropertyMetric::betweenDates($startDate, $endDate)
            ->selectRaw('DATE(created_at) as date, event_type, COUNT(*) as count')
            ->groupBy(['date', 'event_type'])
            ->orderBy('date')
            ->get()
            ->groupBy('date')
            ->map(function ($dayMetrics) {
                return $dayMetrics->pluck('count', 'event_type')->toArray();
            });

        // Usuarios más activos con conteo de propiedades
        $topUsers = DB::table('properties')
            ->join('property_metrics', 'properties.id', '=', 'property_metrics.property_id')
            ->join('users', 'properties.user_id', '=', 'users.id')
            ->whereBetween('property_metrics.created_at', [$startDate, $endDate])
            ->selectRaw('users.id, users.name, users.email, users.created_at, users.email_verified_at, COUNT(*) as total_interactions, COUNT(DISTINCT properties.id) as properties_count')
            ->groupBy(['users.id', 'users.name', 'users.email', 'users.created_at', 'users.email_verified_at'])
            ->orderByDesc('total_interactions')
            ->limit(10)
            ->get();

        // Obtener detalles de propiedades para cada usuario
        foreach ($topUsers as $user) {
            // Obtener TODAS las propiedades del usuario, incluso sin métricas
            $userProperties = DB::table('properties')
                ->leftJoin('property_metrics', function($join) use ($startDate, $endDate) {
                    $join->on('properties.id', '=', 'property_metrics.property_id')
                         ->whereBetween('property_metrics.created_at', [$startDate, $endDate]);
                })
                ->where('properties.user_id', $user->id)
                ->where('properties.active', 1) // Solo propiedades activas
                ->selectRaw('
                    properties.id,
                    properties.title,
                    properties.slug,
                    properties.district,
                    properties.city,
                    properties.price_per_night,
                    properties.currency,
                    properties.created_at as property_created,
                    COALESCE(COUNT(CASE WHEN property_metrics.event_type = "property_view" THEN 1 END), 0) as views,
                    COALESCE(COUNT(CASE WHEN property_metrics.event_type = "airbnb_click" THEN 1 END), 0) as airbnb_clicks,
                    COALESCE(COUNT(CASE WHEN property_metrics.event_type = "gallery_view" THEN 1 END), 0) as gallery_views,
                    COALESCE((COUNT(CASE WHEN property_metrics.event_type = "property_view" THEN 1 END) + 
                             COUNT(CASE WHEN property_metrics.event_type = "airbnb_click" THEN 1 END) + 
                             COUNT(CASE WHEN property_metrics.event_type = "gallery_view" THEN 1 END)), 0) as total_interactions
                ')
                ->groupBy([
                    'properties.id', 'properties.title', 'properties.slug', 
                    'properties.district', 'properties.city', 'properties.price_per_night', 
                    'properties.currency', 'properties.created_at'
                ])
                ->orderByDesc('total_interactions')
                ->orderBy('properties.created_at', 'desc') // Ordenar por fecha de creación si no hay métricas
                ->get();

            // Debug: Log user properties
            Log::info("📊 Propiedades para usuario {$user->id} ({$user->name}):", [
                'total_properties' => $userProperties->count(),
                'sample_properties' => $userProperties->take(3)->toArray() // Solo mostrar las primeras 3 para no saturar logs
            ]);

            $user->properties_details = $userProperties;
        }

        return response()->json([
            'global_metrics' => $globalMetrics,
            'top_properties' => $topProperties,
            'daily_metrics' => $dailyMetrics,
            'top_users' => $topUsers,
            'period' => [
                'start' => $startDate,
                'end' => $endDate
            ]
        ]);
    }

    /**
     * Limpiar métricas de sesión (para depuración)
     */
    public function clearSessionMetrics(Request $request)
    {
        $propertyId = $request->get('property_id');
        
        if ($propertyId) {
            // Limpiar métricas específicas de una propiedad
            $sessionKeys = [
                "property_metric_property_detail_view_{$propertyId}",
                "property_metric_property_view_{$propertyId}",
                "property_metric_gallery_view_{$propertyId}"
            ];
            
            foreach ($sessionKeys as $key) {
                session()->forget($key);
            }
            
            Log::info("🧹 Métricas de sesión limpiadas para propiedad", [
                'property_id' => $propertyId,
                'session_id' => session()->getId(),
                'cleared_keys' => $sessionKeys
            ]);
            
            return response()->json([
                'success' => true,
                'message' => "Métricas de sesión limpiadas para propiedad {$propertyId}",
                'cleared_keys' => $sessionKeys
            ]);
        } else {
            // Limpiar todas las métricas de la sesión
            $sessionData = session()->all();
            $metricsKeys = array_filter(array_keys($sessionData), function($key) {
                return strpos($key, 'property_metric_') === 0;
            });
            
            foreach ($metricsKeys as $key) {
                session()->forget($key);
            }
            
            Log::info("🧹 Todas las métricas de sesión limpiadas", [
                'session_id' => session()->getId(),
                'cleared_keys' => $metricsKeys,
                'total_cleared' => count($metricsKeys)
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Todas las métricas de sesión limpiadas',
                'cleared_keys' => $metricsKeys,
                'total_cleared' => count($metricsKeys)
            ]);
        }
    }

    /**
     * Obtener información de depuración de la sesión
     */
    public function getSessionDebugInfo(Request $request)
    {
        $sessionData = session()->all();
        $metricsKeys = array_filter($sessionData, function($key) {
            return strpos($key, 'property_metric_') === 0;
        }, ARRAY_FILTER_USE_KEY);
        
        return response()->json([
            'session_id' => session()->getId(),
            'user_id' => Auth::id() ?? 'guest',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'metrics_in_session' => $metricsKeys,
            'total_metrics' => count($metricsKeys),
            'session_lifetime' => config('session.lifetime'),
            'current_time' => now()->toISOString()
        ]);
    }
}
