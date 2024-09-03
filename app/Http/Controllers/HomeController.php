<?php

namespace App\Http\Controllers;

use App\Models\Benefit;
use Illuminate\Http\Request;

class HomeController extends BasicController
{
    public $reactView = 'Home';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $benefits = Benefit::select(['icon', 'name', 'image'])
            ->where('status', true)
            ->where('visible', true)
            ->get();
        return [
            'benefits' => $benefits
        ];
    }
}
