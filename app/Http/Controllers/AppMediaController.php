<?php

namespace App\Http\Controllers;

use App\Models\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AppMediaController extends BasicController
{
    public $model = App::class;

}
