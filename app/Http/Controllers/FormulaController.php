<?php

namespace App\Http\Controllers;

use App\Models\Color;
use App\Models\Item;
use App\Models\UserFormulas;
use Illuminate\Http\Request;

class FormulaController extends BasicController
{
    public $reactView = 'Formula';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $userFormulaJpa = UserFormulas::find($request->formula);
        if (!$userFormulaJpa) return redirect('/');

        $itemsJpa = Item::select()
            ->where('visible', true)
            ->where('status', true)
            ->get();

        $colorsJpa = Color::select()
            ->where('status', true)
            ->get();

        return [
            'user_formula' => $userFormulaJpa,
            'items' => $itemsJpa,
            'colors' => $colorsJpa
        ];
    }
}
