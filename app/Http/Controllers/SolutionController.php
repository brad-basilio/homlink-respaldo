<?php

namespace App\Http\Controllers;

use App\Models\LandingHome;
use App\Models\Service;
use App\Models\Solution;
use Illuminate\Http\Request;

class SolutionController extends BasicController
{
    public $model = Solution::class;
    public $reactView = 'SolutionsPage';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        $landing = LandingHome::where('correlative', 'like', 'page_services%')->where('lang_id', $langId)->get();

        $solutions = Solution::where('status', true)->where('visible', true)->where('lang_id', $langId)->orderBy('updated_at', 'DESC')->get();

        return [


            'landing' => $landing,

            'solutions' => $solutions,

        ];
    }
}
