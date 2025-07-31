<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Brand;
use App\Models\LandingHome;
use App\Models\Property;
use App\Models\Service;
use App\Models\Testimony;
use Illuminate\Http\Request;

class PropertyController extends BasicController
{
    public $model = Property::class;
    public $reactView = 'PropertyPage';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        //$landing = LandingHome::where('correlative', 'like', 'page_services%')->where('lang_id', $langId)->get();
        $landing = LandingHome::where('correlative', '=', 'page_home_testimonios')->where('lang_id', $langId)->first();
        $services = Service::where('status', true)
            ->where('visible', true)
            ->where('lang_id', $langId)
            ->orderBy('created_at', 'ASC')
            ->get();
        // $allServices = Service::where('status', true)->where('visible', true)->where('lang_id', $langId)->where('category_service_id', $services->category_service_id)->with('category')->orderBy('updated_at', 'DESC')->get();
        $brands = Brand::where('status', true)->where('visible', true)->orderBy('updated_at', 'DESC')->get();
        $testimonios = Testimony::where('status', true)->where('lang_id', $langId)->get();
//dump($services);
   $banner_slider = Banner::where('status', true)
            ->where('visible', true)
            ->where('section', 'servicios')
            ->where('position', 'slider')
            ->orderBy('order', 'asc')
            ->get();
        return [
            'landing' => $landing,
            'services' => $services,
            'brands' => $brands,
            'testimonios' => $testimonios,
            'banner_slider' => $banner_slider,
            //    'allServices' => $allServices,
        ];
    }
}
