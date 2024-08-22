<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends BasicController
{
    public $reactView = 'Home';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        return [];
    }
}
