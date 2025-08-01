<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Ad;
use App\Models\Category;
use App\Models\Indicator;
use App\Models\Item;
use App\Models\Post;
use App\Models\Property;
use App\Models\LandingHome;
use App\Models\Slider;
use App\Models\Supply;
use App\Models\Testimony;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CatalogController extends BasicController
{
    public $reactView = 'CatalogoProductos';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $sliders = Slider::where('status', true)->where('visible', true)->get();
        $testimonies = Testimony::where('status', true)->where('visible', true)->get();
        $landing = LandingHome::where('status', true)->where('visible', true)->first();

        $supplies = Supply::where('status', true)->where('visible', true)->where('featured', true)->get();
        $anuncio = Ad::where('status', true)
            ->where('visible', true)
            ->where('invasivo', true)
            ->where(function ($query) {
                $query->whereNull('date_begin')
                    ->whereNull('date_end')
                    ->orWhere(function ($query) {
                        $query->where('date_begin', '<=', Carbon::now())
                            ->where('date_end', '>=', Carbon::now());
                    });
            })->orderBy('updated_at', 'desc')
            ->first();

        // Obtener propiedades con filtros aplicados
        $propertiesQuery = Property::where('active', true);

        // Aplicar filtros de búsqueda si existen
        if ($request->has('location') && !empty($request->location)) {
            $location = $request->location;
            $propertiesQuery->where(function($query) use ($location) {
                $query->where('district', 'like', "%{$location}%")
                      ->orWhere('province', 'like', "%{$location}%")
                      ->orWhere('department', 'like', "%{$location}%")
                      ->orWhere('address', 'like', "%{$location}%");
            });
        }

        // Filtro por número de huéspedes (adultos + niños)
        if ($request->has('adults') && !empty($request->adults)) {
            $totalGuests = (int)$request->adults;
            
            if ($request->has('children') && !empty($request->children)) {
                $totalGuests += (int)$request->children;
            }
            
            $propertiesQuery->where('max_guests', '>=', $totalGuests);
        }

        $propiedades = $propertiesQuery->orderBy('created_at', 'desc')->get();

        $categories = Category::all();
        
        // Pasar los filtros de búsqueda al frontend
        $searchFilters = [
            'location' => $request->location ?? '',
            'checkin' => $request->checkin ?? '',
            'checkout' => $request->checkout ?? '',
            'adults' => $request->adults ?? '',
            'children' => $request->children ?? '',
        ];
        
        return [
            'sliders' => $sliders,
            'testimonies' => $testimonies,
            'propiedades' => $propiedades,
            'landing' => $landing,
            'supplies' => $supplies,
            'anuncio' => $anuncio,
            'categories' => $categories,
            'searchFilters' => $searchFilters
        ];
    }
}
