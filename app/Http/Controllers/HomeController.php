<?php

namespace App\Http\Controllers;

use App\Models\Benefit;
use App\Models\Resource;
use App\Models\Slider;
use App\Models\Testimony;
use Illuminate\Http\Request;

class HomeController extends BasicController
{
    public $reactView = 'Home';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $sliders = Slider::select()
            ->where('status', true)
            ->where('visible', true)
            ->get();
        $benefits = Benefit::select(['icon', 'name', 'image'])
            ->where('status', true)
            ->where('visible', true)
            ->get();
        $resources = Resource::lastThree();

        $testimonies = Testimony::lastTen();
        return [
            'sliders' => $sliders,
            'benefits' => $benefits,
            'resources' => $resources,
            'testimonies' => $testimonies,
        ];
    }
}
