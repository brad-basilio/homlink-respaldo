<?php

namespace App\Http\Controllers;

use App\Models\LandingHome;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends BasicController
{
    public $model = Service::class;
    public $reactView = 'ServiciosPage';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {

        $landing = LandingHome::where('correlative', 'like', 'page_services%')->get();

        $services = Service::where('status', true)->where('visible', true)->orderBy('updated_at', 'DESC')->get();

        return [


            'landing' => $landing,

            'services' => $services,

        ];
    }
}
