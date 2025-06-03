<?php

namespace App\Http\Controllers;

use App\Models\Infoproduct;
use Illuminate\Http\Request;

class InfoproductController extends BasicController
{
    public $model = Infoproduct::class;
    public $prefix4filter = 'infoproducts';

    public function setPaginationInstance(string $model)
    {

        return $model::select(['infoproducts.*'])
            ->with(['category'])
            ->join('infoproduct_categories AS category', 'category.id', 'infoproducts.category_id')
            ->where('infoproducts.status', true)
            ->where('category.status', true);
    }
}
