<?php

namespace App\Http\Controllers;
use App\Models\LandingHome;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqDetailController extends BasicController
{
    public $reactView = 'DetailFaq';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {   
        $langId = app('current_lang_id');
        $landing = LandingHome::where('correlative', 'like', 'page_faqs%')->where('lang_id', $langId)->get();
        $faqsJpa = Faq::select()->where('slug', $request->slug)->where('visible', true)->where('status', true)->where('lang_id', $langId)->first();

        return [
            'detalleFaq' => $faqsJpa,
            'landing' => $landing,
        ];
    }
}
