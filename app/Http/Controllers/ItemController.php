<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ItemController extends BasicController
{
    public $model = Item::class;
    public $reactView = 'Courses';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $categories = Category::select([
            DB::raw('DISTINCT(categories.id)'),
            'categories.name'
        ])
            ->join('items', 'items.category_id', 'categories.id')
            ->where('categories.visible', true)
            ->where('categories.status', true)
            ->get();
        return [
            'categories' => $categories
        ];
    }
}
