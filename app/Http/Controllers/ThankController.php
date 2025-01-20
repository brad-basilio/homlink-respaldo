<?php

namespace App\Http\Controllers;

use App\Jobs\SendSaleWhatsApp;
use App\Models\Sale;
use Illuminate\Http\Request;

class ThankController extends BasicController
{
    public $reactView = 'Thanks';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        if ($request->input('code2send')) {
            $sale = Sale::where('code', $request->input('code2send'))->first();
            SendSaleWhatsApp::dispatchAfterResponse($sale, true, false);
        }
        return [];
    }
}
