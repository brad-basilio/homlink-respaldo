<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Ad;
use App\Models\Category;
use App\Models\Indicator;
use App\Models\Item;
use App\Models\Post;
use App\Models\Slider;
use App\Models\Supply;
use App\Models\Testimony;
use Illuminate\Http\Request;

class CatalogController extends BasicController
{
    public $reactView = 'CatalogProducts';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $sliders = Slider::where('status', true)->where('visible', true)->get();
        $testimonies = Testimony::where('status', true)->where('visible', true)->get();

        $supplies = Supply::where('status', true)->where('visible', true)->where('featured', true)->get();
        $popups = Ad::today();
        $items = Item::where('status', true)->where('visible', true)->with('category')->get();
        $categories = Category::all();
        return [
            'sliders' => $sliders,
            'testimonies' => $testimonies,
            'items' => $items,
            'supplies' => $supplies,
            'popups' => $popups,
            'categories' => $categories
        ];
    }
}
