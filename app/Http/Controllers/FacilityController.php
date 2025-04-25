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

        $langId = app('current_lang_id');
        $landing = LandingHome::where('correlative', 'like', 'page_facility%')->where('lang_id', $langId)->get();
        $facilities = Facility::where('status', true)->where('visible', true)->where('lang_id', $langId)->orderBy('created_at', 'ASC')->get();

        return [
            'landing' => $landing,
            'facilities' => $facilities,
        ];
    }
}
