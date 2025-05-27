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
    public $reactView = 'DetailPurchaseOption';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        $landing = LandingHome::where('correlative', 'like', 'page_purchase%')->where('lang_id', $langId)->get();
        $purchaseOptions = PurchaseOption::where('slug', $request->slug)->where('status', true)->where('visible', true)->where('lang_id', $langId)->with('category')->first();
        $allOptions = PurchaseOption::where('status', true)->where('visible', true)->where('lang_id', $langId)->where('category_purchase_option_id', $purchaseOptions->category_purchase_option_id)->with('category')->orderBy('updated_at', 'DESC')->get();
        return [
            'landing' => $landing,
            'purchaseOptions' => $purchaseOptions,
            'allOptions' => $allOptions,
        ];
    }
}
