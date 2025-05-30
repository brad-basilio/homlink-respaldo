<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends BasicController
{
    //public $reactView = 'B';
    //public $reactRootView = 'public';
    public $model = Brand::class;
}
