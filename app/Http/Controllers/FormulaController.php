<?php

namespace App\Http\Controllers;

use App\Models\Bundle;
use App\Models\Color;
use App\Models\Item;
use App\Models\Renewal;
use App\Models\UserFormulas;
use Illuminate\Http\Request;

class FormulaController extends BasicController
{
    public $reactView = 'Formula';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $userFormulaJpa = UserFormulas::find($request->formula);
        if (!$userFormulaJpa) return redirect()->route('Test.jsx');

        $itemsJpa = Item::select()
            ->where('visible', true)
            ->where('status', true)
            ->get();

        $colorsJpa = Color::select()
            ->where('status', true)
            ->get();

        $bundlesJpa = Bundle::with(['items'])
            ->where('status', true)
            ->get();

        $planesJpa = Renewal::today()
            ->where('status', true)
            ->where('visible', true)
            ->get();

        return [
            'user_formula' => $userFormulaJpa,
            'items' => $itemsJpa,
            'colors' => $colorsJpa,
            'bundles' => $bundlesJpa,
            'planes' => $planesJpa,
            'publicKey' => env('CULQI_PUBLIC_KEY')
        ];
    }
}
