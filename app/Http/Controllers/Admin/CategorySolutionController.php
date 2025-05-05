<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\CategorySolution;
use Illuminate\Http\Request;

class CategorySolutionController extends BasicController
{
    public $model = CategorySolution::class;
    public $reactView = 'Admin/CategorySolutions';
}
