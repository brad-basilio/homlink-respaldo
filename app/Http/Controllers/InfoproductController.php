<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Infoproduct;
use App\Models\InfoproductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Post;
use App\Models\LandingHome;
use App\Models\Slider;

class InfoproductController extends PublicController
{
    public $reactView = 'Infoproductos';
    public $reactRootView = 'public';
    public $model = Infoproduct::class;

    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        $categories = InfoproductCategory::all();
       
        $landing = LandingHome::where('correlative', '=', 'page_infoproducts_banner')->where('lang_id', $langId)->first();
        
        // Obtener los sliders y añadir button_text y button_link personalizados
        $productosRecientes = Post::where('status', true)
            ->orderBy('created_at', 'desc')
            ->with('category')
            ->limit(3)
            ->get();


        return [
            'categories' => $categories,
            'productosRecientes' => $productosRecientes,
            'landing' => $landing,
         
        ];
    }
}
