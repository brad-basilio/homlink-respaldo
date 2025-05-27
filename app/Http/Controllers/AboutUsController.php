<?php

namespace App\Http\Controllers;
use App\Models\Aboutus;
use App\Models\LandingHome;
use App\Models\Staff;
use App\Models\CoreValue;
use App\Models\Strength;
use App\Models\Testimony;
use Illuminate\Http\Request;

class AboutUsController extends BasicController
{   
    public $reactView = 'About';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        $landing = LandingHome::where('correlative', 'like', 'page_aboutus%')->where('lang_id', $langId)->get();
        $issues = Staff::where('visible', true)->where('status', true)->where('lang_id', $langId)->get();
        $valores = CoreValue::where('visible', true)->where('status', true)->where('lang_id', $langId)->get();
        $paises = Strength::where('visible', true)->where('status', true)->where('lang_id', $langId)->get();
        $sectores = Testimony::where('visible', true)->where('status', true)->where('lang_id', $langId)->get();
        return [
            'landing' => $landing,
            'issues' => $issues,
            'valores' => $valores,
            'paises' => $paises,
            'sectores' => $sectores,
        ];
    }
}
