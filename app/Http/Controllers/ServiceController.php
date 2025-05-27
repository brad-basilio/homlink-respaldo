<?php

namespace App\Http\Controllers;

use App\Models\LandingHome;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends BasicController
{
    public $model = Service::class;
    // public $reactView = 'ServiciosPage';
    public $reactView = 'DetailService';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        $landing = LandingHome::where('correlative', 'like', 'page_services%')->where('lang_id', $langId)->get();
        $services = Service::where('slug', $request->slug)->where('status', true)->where('visible', true)->where('lang_id', $langId)->with('category')->first();
        $allServices = Service::where('status', true)->where('visible', true)->where('lang_id', $langId)->where('category_service_id', $services->category_service_id)->with('category')->orderBy('updated_at', 'DESC')->get();
        
        return [
            'landing' => $landing,
            'services' => $services,
            'allServices' => $allServices,
        ];
    }
}
