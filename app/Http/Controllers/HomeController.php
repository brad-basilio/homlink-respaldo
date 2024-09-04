<?php

namespace App\Http\Controllers;

use App\Models\Benefit;
use App\Models\Slider;
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
        return [
            'sliders' => $sliders,
            'benefits' => $benefits
        ];
    }
}
