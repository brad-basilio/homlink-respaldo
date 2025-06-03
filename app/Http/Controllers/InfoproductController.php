<?php

namespace App\Http\Controllers;

use App\Models\Infoproduct;
use App\Models\InfoproductCategory;
use App\Models\LandingHome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InfoproductController extends BasicController
{
    public $model = Infoproduct::class;
    public $prefix4filter = 'infoproducts';
      public $reactView = 'Infoproductos';

    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        $categories = InfoproductCategory::select([
            DB::raw('DISTINCT(infoproduct_categories.id)'),
            'infoproduct_categories.name'
        ])
            ->join('infoproducts', 'infoproducts.category_id', 'infoproduct_categories.id')
            ->where('infoproduct_categories.visible', true)
         
            ->where('infoproduct_categories.status', true)
            ->get();
        $productosRecientes = Infoproduct::where('status', true)->with('category')->limit(3)->get();
        $landing = LandingHome::where('correlative', 'like', 'page_blog%')->where('lang_id', $langId)->get();
        
      


        return [
            'categories' => $categories,
            'productosRecientes' => $productosRecientes,
            'landing' => $landing,
         
        ];
    }
}
