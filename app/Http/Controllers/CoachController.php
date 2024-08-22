<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use App\Models\User;
use Illuminate\Http\Request;
use SoDe\Extend\File;
use SoDe\Extend\JSON;

class CoachController extends BasicController
{
    public $reactView = 'Profile';
    public $reactRootView = 'public';
    
    public function setReactViewProperties(Request $request)
    {
        $coach = User::where('uuid', $request->coach)->first();

        if (!$coach) return redirect('/');

        $countries = JSON::parse(File::get('../storage/app/utils/countries.json'));
        $country = array_filter($countries, function ($country) use ($coach) {
            return $country['id'] == $coach->country;
        });
        $country = reset($country);

        $resoources = Resource::where('owner_id', $coach->id)->get();

        return [
            'coach' => $coach,
            'country' => $country,
            'resources' => $resoources,
        ];
    }
}
