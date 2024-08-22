<?php

namespace App\Http\Controllers\Coach;

use App\Http\Controllers\BasicController;
use Illuminate\Http\Request;
use SoDe\Extend\File;
use SoDe\Extend\JSON;

class ProfileController extends BasicController
{
    public $reactView = 'Coach/Profile';

    public function setReactViewProperties(Request $request)
    {
        $countries = JSON::parse(File::get('../storage/app/utils/countries.json'));
        return [
            'countries' => $countries
        ];
    }
}
