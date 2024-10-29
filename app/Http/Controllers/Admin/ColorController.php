<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorController extends BasicController
{
    public $model = Color::class;
    public $reactView = 'Admin/Colors';
}
