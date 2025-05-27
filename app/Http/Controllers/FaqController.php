<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Http\Requests\StoreFaqRequest;
use App\Http\Requests\UpdateFaqRequest;
use Illuminate\Http\Request;
use App\Models\LandingHome;

class FaqController extends BasicController
{
    public $reactView = 'FAQs';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        $landing = LandingHome::where('correlative', 'like', 'page_faqs%')->where('lang_id', $langId)->get();
        $faqsJpa = Faq::select()->where('visible', true)->where('status', true)->where('lang_id', $langId)->orderBy('updated_at', 'DESC')->get();

        return [
            'faqs' => $faqsJpa,
            'landing' => $landing,

        ];
    }
}
