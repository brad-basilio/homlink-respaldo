<?php

namespace App\Http\Controllers;

use App\Models\Setting;

class SettingController extends Controller
{

    static function get($name)
    {
        $jpa = Setting::where('name', $name)->first();
        if (!$jpa) return null;
        return $jpa->value;
    }
}
