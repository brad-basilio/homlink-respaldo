<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\PropertyMetric;
use App\Models\Property;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class PropertyMetricsController extends BasicController
{
    public $reactView = 'Admin/PropertyMetrics.jsx';

    public function __construct()
    {
        $this->middleware(['auth', 'can:Admin'])->except(['track']);
    }

    /**
     * Datos adicionales para la vista React
     */
    public function setReactViewProperties(Request $request)
    {
        $dateFrom = $request->get('date_from', Carbon::now()->subDays(30)->format('Y-m-d'));
        $dateTo = $request->get('date_to', Carbon::now()->format('Y-m-d'));

        // Convertir fechas a rangos completos con hora
        $dateFromFull = Carbon::parse($dateFrom)->startOfDay();
        $dateToFull = Carbon::parse($dateTo)->endOfDay();

        // Métricas generales
        $totalViews = PropertyMetric::where('event_type', 'property_view')
            ->whereBetween('created_at', [$dateFromFull, $dateToFull])
            ->count();

        $totalClicks = PropertyMetric::where('event_type', 'airbnb_click')
            ->whereBetween('created_at', [$dateFromFull, $dateToFull])
            ->count();

        $totalWhatsApp = PropertyMetric::where('event_type', 'whatsapp_click')
            ->whereBetween('created_at', [$dateFromFull, $dateToFull])
            ->count();

        $conversionRate = $totalViews > 0 ? round(($totalClicks / $totalViews) * 100, 2) : 0;

        // Top propiedades por vistas
        $topProperties = PropertyMetric::select('property_id')
            ->selectRaw('COUNT(*) as total_views')
            ->where('event_type', 'property_view')
            ->whereBetween('created_at', [$dateFromFull, $dateToFull])
            ->groupBy('property_id')
            ->orderBy('total_views', 'desc')
            ->limit(10)
            ->with('property')
            ->get();

        // Métricas por día
        $dailyMetrics = PropertyMetric::selectRaw('DATE(created_at) as date')
            ->selectRaw('event_type')
            ->selectRaw('COUNT(*) as count')
            ->whereBetween('created_at', [$dateFromFull, $dateToFull])
            ->groupBy('date', 'event_type')
            ->orderBy('date')
            ->get()
            ->groupBy('date');

        return [
            'metrics' => [
                'totalViews' => $totalViews,
                'totalClicks' => $totalClicks,
                'conversionRate' => $conversionRate,
                'topProperties' => $topProperties,
                'dailyMetrics' => $dailyMetrics,
                'dateFrom' => $dateFrom,
                'dateTo' => $dateTo
            ]
        ];
    }

    /**
     * API: Registrar una métrica
     */
    public function track(Request $request)
    {
        try {
            // Registrar datos de la petición para debugging
            Log::debug('PropertyMetrics track request', [
                'request' => $request->all(),
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'headers' => $request->header(),
            ]);
            
            // Validación más permisiva para debugging
            $validated = $request->validate([
                'property_id' => 'required', // Ya no validamos exists para simplificar
                'event_type' => 'required|string', // Permitimos cualquier tipo de evento
                'metadata' => 'nullable', // No requerimos que sea array
            ]);
            
            // Crear la métrica
            $metric = PropertyMetric::create([
                'property_id' => $validated['property_id'],
                'event_type' => $validated['event_type'],
                'user_ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'referrer' => $request->header('Referer'),
                'metadata' => $validated['metadata'] ?? null,
            ]);
            
            // Retornar éxito con información para debugging
            return response()->json([
                'success' => true,
                'metric_id' => $metric->id,
                'timestamp' => $metric->created_at,
                'property_id' => $metric->property_id,
                'event_type' => $metric->event_type
            ]);
            
        } catch (\Exception $e) {
            // Registrar el error
            Log::error('Error registrando métrica', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all(),
            ]);
            
            // Retornar información de error para debugging
            return response()->json([
                'error' => 'Error registrando métrica',
                'message' => $e->getMessage(),
                'debug_info' => [
                    'code' => $e->getCode(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                ]
            ], 500);
        }
    }

    /**
     * API: Obtener métricas de una propiedad específica
     */
    public function getPropertyMetrics(Request $request, $propertyId)
    {
        try {
            $property = Property::findOrFail($propertyId);
            
            $metrics = [
                'total_views' => PropertyMetric::where('property_id', $propertyId)
                    ->where('event_type', 'property_view')->count(),
                'total_airbnb_clicks' => PropertyMetric::where('property_id', $propertyId)
                    ->where('event_type', 'airbnb_click')->count(),
                'total_whatsapp_clicks' => PropertyMetric::where('property_id', $propertyId)
                    ->where('event_type', 'whatsapp_click')->count(),
            ];

            $metrics['conversion_rate'] = $metrics['total_views'] > 0 
                ? round((($metrics['total_airbnb_clicks'] + $metrics['total_whatsapp_clicks']) / $metrics['total_views']) * 100, 2)
                : 0;

            return response()->json([
                'property' => $property,
                'metrics' => $metrics
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Property not found'], 404);
        }
    }

    /**
     * API: Dashboard de usuario (métricas de sus propiedades)
     */
    public function getUserDashboard(Request $request)
    {
        try {
            $user = auth()->user();
            
            $properties = $user->properties()
                ->withCount([
                    'metrics as total_views' => function ($query) {
                        $query->where('event_type', 'property_view');
                    },
                    'metrics as total_airbnb_clicks' => function ($query) {
                        $query->where('event_type', 'airbnb_click');
                    },
                    'metrics as total_whatsapp_clicks' => function ($query) {
                        $query->where('event_type', 'whatsapp_click');
                    }
                ])
                ->get();

            return response()->json([
                'properties' => $properties,
                'summary' => [
                    'total_properties' => $properties->count(),
                    'total_views' => $properties->sum('total_views'),
                    'total_clicks' => $properties->sum('total_airbnb_clicks') + $properties->sum('total_whatsapp_clicks'),
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching dashboard'], 500);
        }
    }

    /**
     * API: Dashboard de administrador (todas las métricas)
     */
    public function getAdminDashboard(Request $request)
    {
        try {
            $dateFrom = $request->get('date_from', Carbon::now()->subDays(30)->toDateString());
            $dateTo = $request->get('date_to', Carbon::now()->toDateString());

            // Convertir fechas a rangos completos con hora
            $dateFromFull = Carbon::parse($dateFrom)->startOfDay();
            $dateToFull = Carbon::parse($dateTo)->endOfDay();

            // Métricas globales agrupadas por tipo de evento
            $globalMetrics = PropertyMetric::selectRaw('event_type, COUNT(*) as count')
                ->whereBetween('created_at', [$dateFromFull, $dateToFull])
                ->groupBy('event_type')
                ->get()
                ->pluck('count', 'event_type')
                ->toArray();

            // Top propiedades con datos completos
            $topPropertiesRaw = PropertyMetric::select('property_metrics.property_id')
                ->selectRaw('COUNT(*) as views_count')
                ->where('property_metrics.event_type', 'property_view')
                ->whereBetween('property_metrics.created_at', [$dateFromFull, $dateToFull])
                ->groupBy('property_metrics.property_id')
                ->orderBy('views_count', 'desc')
                ->limit(10)
                ->get();

            // Obtener los datos completos de las propiedades
            $propertyIds = $topPropertiesRaw->pluck('property_id')->toArray();
            $propertiesWithUsers = Property::whereIn('id', $propertyIds)
                ->with('user')
                ->get()
                ->keyBy('id');

            // Combinar los datos
            $topProperties = $topPropertiesRaw->map(function ($item) use ($propertiesWithUsers) {
                $property = $propertiesWithUsers->get($item->property_id);
                return [
                    'id' => $item->property_id,
                    'title' => $property ? $property->title : 'Propiedad eliminada',
                    'slug' => $property ? $property->slug : 'sin-slug',
                    'district' => $property ? $property->district : 'N/A',
                    'city' => $property ? $property->city : 'N/A',
                    'price_per_night' => $property ? $property->price_per_night : null,
                    'currency' => $property ? $property->currency : 'PEN',
                    'user_id' => $property && $property->user ? $property->user->id : null,
                    'user_name' => $property && $property->user ? $property->user->name : 'Usuario eliminado',
                    'user_email' => $property && $property->user ? $property->user->email : null,
                    'views_count' => $item->views_count
                ];
            });

            // Top usuarios con datos completos
            $topUsersRaw = PropertyMetric::select('properties.user_id')
                ->selectRaw('COUNT(property_metrics.id) as total_interactions')
                ->join('properties', 'property_metrics.property_id', '=', 'properties.id')
                ->whereBetween('property_metrics.created_at', [$dateFromFull, $dateToFull])
                ->whereNotNull('properties.user_id')
                ->groupBy('properties.user_id')
                ->orderBy('total_interactions', 'desc')
                ->limit(10)
                ->get();

            // Obtener los datos completos de los usuarios
            $userIds = $topUsersRaw->pluck('user_id')->toArray();
            $usersComplete = User::whereIn('id', $userIds)
                ->withCount('properties')
                ->get()
                ->keyBy('id');

            // Obtener propiedades detalladas para cada usuario
            $userPropertiesDetails = [];
            foreach ($userIds as $userId) {
                $userProperties = PropertyMetric::select('properties.id', 'properties.title', 'properties.slug', 'properties.district', 'properties.city')
                    ->selectRaw('COUNT(CASE WHEN property_metrics.event_type = "property_view" THEN 1 END) as views')
                    ->selectRaw('COUNT(CASE WHEN property_metrics.event_type = "airbnb_click" THEN 1 END) as airbnb_clicks')
                    ->selectRaw('COUNT(CASE WHEN property_metrics.event_type = "gallery_view" THEN 1 END) as gallery_views')
                    ->join('properties', 'property_metrics.property_id', '=', 'properties.id')
                    ->where('properties.user_id', $userId)
                    ->whereBetween('property_metrics.created_at', [$dateFromFull, $dateToFull])
                    ->groupBy('properties.id', 'properties.title', 'properties.slug', 'properties.district', 'properties.city')
                    ->orderBy('views', 'desc')
                    ->get();

                $userPropertiesDetails[$userId] = $userProperties->map(function ($property) {
                    return [
                        'id' => $property->id,
                        'title' => $property->title,
                        'slug' => $property->slug,
                        'district' => $property->district,
                        'city' => $property->city,
                        'views' => $property->views,
                        'airbnb_clicks' => $property->airbnb_clicks,
                        'gallery_views' => $property->gallery_views,
                        'total_interactions' => $property->views + $property->airbnb_clicks + $property->gallery_views
                    ];
                });
            }

            // Combinar los datos de usuarios
            $topUsers = $topUsersRaw->map(function ($item) use ($usersComplete, $userPropertiesDetails) {
                $user = $usersComplete->get($item->user_id);
                return [
                    'id' => $item->user_id,
                    'name' => $user ? $user->name : 'Usuario eliminado',
                    'email' => $user ? $user->email : null,
                    'email_verified_at' => $user ? $user->email_verified_at : null,
                    'created_at' => $user ? $user->created_at : null,
                    'total_interactions' => $item->total_interactions,
                    'properties_count' => $user ? $user->properties_count : 0,
                    'properties_details' => $userPropertiesDetails[$item->user_id] ?? []
                ];
            });

            return response()->json([
                'global_metrics' => $globalMetrics,
                'top_properties' => $topProperties,
                'top_users' => $topUsers,
                'date_range' => [$dateFrom, $dateTo]
            ]);
        } catch (\Exception $e) {
            Log::error('Error en getAdminDashboard: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching admin dashboard', 'details' => $e->getMessage()], 500);
        }
    }
}
