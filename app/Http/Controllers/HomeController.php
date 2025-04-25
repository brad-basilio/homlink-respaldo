<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Ad;
use App\Models\Indicator;
use App\Models\InstagramPost;
use App\Models\Item;
use App\Models\LandingHome;
use App\Models\Lang;
use App\Models\Post;
use App\Models\Service;
use App\Models\Slider;
use App\Models\Staff;
use App\Models\Strength;
use App\Models\Supply;
use App\Models\Testimony;
use Illuminate\Http\Request;

class HomeController extends BasicController
{
    public $reactView = 'Home';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {


        /*ESTO ES PARA NO PAIN */

        $indicators = Indicator::where('status', true)->where('visible', true)->get();
        $landing = LandingHome::where('correlative', 'like', 'page_home%')->get();
        $benefits = Strength::where('status', true)->where('visible', true)->get();
        $services = Service::where('featured', true)->where('status', true)->where('visible', true)->orderBy('updated_at', 'DESC')->get();
        $testimonies = Testimony::where('status', true)->where('visible', true)->get();
        $staff_boss = Staff::where('status', true)->where('visible', true)->where('job', 'LIKE', 'Director%')->first();

        return [

            'indicators' => $indicators,
            'landing' => $landing,
            'benefits' => $benefits,
            'services' => $services,
            'testimonies' => $testimonies,
            'staff_boss' => $staff_boss,
            // 'languagesSystem' => Lang::where('status', true)->where('visible', true)->get(),
        ];
    }
}
