<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Http\Requests\StoreAboutusRequest;
use App\Http\Requests\UpdateAboutusRequest;
use App\Models\Indicator;
use Illuminate\Http\Request;

class AboutusController extends BasicController
{
    public $model = Aboutus::class;
    public $reactView = 'About';
    public $reactRootView = 'public';

    // public function setReactViewProperties(Request $request)
    // {
    //     $aboutus = Aboutus::all();
    //     $indicators = Indicator::select(['name', 'symbol', 'description'])
    //         ->where('status', true)
    //         ->where('visible', true)
    //         ->get();
    //     return [
    //         'aboutus' => $aboutus,
    //         'indicators' => $indicators
    //     ];
    // }
}
