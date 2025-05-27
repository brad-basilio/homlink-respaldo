<?php

namespace App\Http\Controllers;

use App\Models\LandingHome;
use App\Models\Indicator;
use Illuminate\Http\Request;

class LegalController extends BasicController
{
    public $reactView = 'Legal';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {   
        $langId = app('current_lang_id');
        $landing = LandingHome::where('correlative', 'like', 'page_legal%')->where('lang_id', $langId)->get();
        $indicators = Indicator::where('status', true)->where('visible', true)->where('lang_id', $langId)->orderBy('updated_at', 'DESC')->get();

        return [
            'landing' => $landing,
            'indicators' => $indicators,
        ];
    }
}
