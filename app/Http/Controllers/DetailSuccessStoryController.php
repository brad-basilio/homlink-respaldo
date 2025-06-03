<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\LandingHome;
use App\Models\Service;
use App\Models\SuccessStory;
use App\Models\Testimony;
use Illuminate\Http\Request;

class DetailSuccessStoryController extends BasicController
{
    public $model = Service::class;
    // public $reactView = 'ServiciosPage';
    public $reactView = 'DetalleCasoExito';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        //$landing = LandingHome::where('correlative', 'like', 'page_services%')->where('lang_id', $langId)->get();
        $landing = LandingHome::where('correlative', '=', 'page_home_testimonios')->where('lang_id', $langId)->first();
        $successStory = SuccessStory::where('slug', $request->slug)->first();

        $successStoryRecents = SuccessStory::where('visible', true)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();
     

        return [
            'landing' => $landing,
            'successStory' => $successStory,
            'successStoryRecents' => $successStoryRecents,
         
            //    'allServices' => $allServices,
        ];
    }
}
