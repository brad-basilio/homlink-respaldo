<?php

namespace App\Http\Controllers;

use App\Models\LandingHome;
use App\Models\PurchaseOption;
use App\Models\Service;
use App\Models\Solution;
use Illuminate\Http\Request;

class PurchaseOptionController extends BasicController
{
    public $model = PurchaseOption::class;
    public $reactView = 'PurchaseOptions';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        $landing = LandingHome::where('correlative', 'like', 'page_services%')->where('lang_id', $langId)->get();

        $purchaseOptions = PurchaseOption::where('status', true)->where('visible', true)->where('lang_id', $langId)->orderBy('updated_at', 'DESC')->get();

        return [


            'landing' => $landing,

            'purchaseOptions' => $purchaseOptions,

        ];
    }
}
