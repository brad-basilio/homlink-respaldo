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
      
        return [
            'renewals' => $renewals,
          
        ];
    }
}
