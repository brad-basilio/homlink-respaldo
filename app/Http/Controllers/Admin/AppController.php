<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AppController extends BasicController
{
    public $model = App::class;
    public $reactView = 'Admin/Apps';
    public $imageFields = ['image'];

    public function setReactViewProperties(Request $request)
    {
        return [];
    }

}
