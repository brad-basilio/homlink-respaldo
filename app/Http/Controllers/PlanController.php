<?php

namespace App\Http\Controllers;

use App\Models\LandingHome;
use App\Models\Renewal;
use App\Models\Testimony;
use Illuminate\Http\Request;

class PlanController extends BasicController
{
    //public $reactView = 'Plans';
    public $reactView = 'DetalleCasoExito';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        $renewals = Renewal::today()
            ->select(['name', 'percentage'])
            ->where('status', true)
            ->where('visible', true)
            ->get();
         $testimonios = Testimony::where('status', true)->where('lang_id', $langId)->get();
          $landing = LandingHome::where('correlative', '=', 'page_home_testimonios')->where('lang_id', $langId)->first();
        return [
            'renewals' => $renewals,
            'testimonios' => $testimonios,
            'landing' => $landing
        ];
    }
}
