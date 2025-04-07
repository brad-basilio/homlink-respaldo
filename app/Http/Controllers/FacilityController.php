<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use App\Models\LandingHome;
use App\Models\Service;
use Illuminate\Http\Request;

class FacilityController extends BasicController
{
    public $model = Facility::class;
    public $reactView = 'InstalacionesPage';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {


        $landing = LandingHome::where('correlative', 'like', 'page_facility%')->get();
        $facilities = Facility::where('status', true)->where('visible', true)->orderBy('created_at', 'ASC')->get();

        return [
            'landing' => $landing,
            'facilities' => $facilities,
        ];
    }
}
