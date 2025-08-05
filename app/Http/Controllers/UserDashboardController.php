<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        
        // Obtener propiedades del usuario con métricas básicas
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
            ->orderByDesc('created_at')
            ->get();

        return [
            'userProperties' => $properties,
            'userStats' => [
                'totalProperties' => $properties->count(),
                'totalViews' => $properties->sum('total_views'),
                'totalAirbnbClicks' => $properties->sum('total_airbnb_clicks'),
                'totalWhatsappClicks' => $properties->sum('total_whatsapp_clicks'),
            ]
        ];
    }
}
