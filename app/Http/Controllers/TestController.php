<?php

namespace App\Http\Controllers;

use App\Models\Formula;
use App\Models\Fragrance;
use Illuminate\Http\Request;

class TestController extends BasicController
{
    public $reactView = 'Test';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $has_treatment = Formula::where('name', 'has_treatment')->get();
        $scalp_type = Formula::where('name', 'scalp_type')->get();
        $hair_type = Formula::where('name', 'hair_type')->get();
        $hair_goals = Formula::where('name', 'hair_goals')->get();
        $fragrances = Fragrance::select()
            ->where('visible', true)
            ->where('status', true)
            ->get();
        return [
            'hasTreatment' => $has_treatment,
            'scalpType' => $scalp_type,
            'hairType' => $hair_type,
            'hairGoals' => $hair_goals,
            'fragrances' => $fragrances
        ];
    }
}
