<?php

namespace App\Http\Controllers;

use App\Models\LandingHome;
use App\Models\Specialty;
use Illuminate\Http\Request;

class PartnerController extends BasicController
{
    public $reactView = 'Partners';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {   
        $langId = app('current_lang_id');
        $landing = LandingHome::where('correlative', 'like', 'page_partners%')->where('lang_id', $langId)->get();
        $aliances = Specialty::where('status', true)->where('visible', true)->where('lang_id', $langId)->orderBy('updated_at', 'DESC')->get();

        return [
            'landing' => $landing,
            'aliances' => $aliances,
        ];
    }
}
