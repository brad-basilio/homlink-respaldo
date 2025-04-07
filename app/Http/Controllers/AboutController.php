<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\General;
use App\Models\Indicator;
use App\Models\InstagramPost;
use App\Models\LandingHome;
use App\Models\Specialty;
use App\Models\Staff;
use App\Models\Strength;
use App\Models\Testimony;
use Illuminate\Http\Request;

class AboutController extends BasicController
{
    public $reactView = 'FisioTerapiaPage';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {


        $landing = LandingHome::where('correlative', 'like', 'page_aboutus%')->get();
        $staffData = Staff::where('visible', true)
            ->whereNotIn('job', ['Director', 'Directora'])
            ->where('status', true)
            ->get();
        $specialities = Specialty::where('visible', true)
            ->where('status', true)
            ->get();

        return [
            'landing' => $landing,
            'staffData' => $staffData,
            'specialities' => $specialities,
        ];
    }
}
