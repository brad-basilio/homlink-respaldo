<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\CategoryService;
use Illuminate\Http\Request;

class CategoryServiceController extends BasicController
{
    public $model = CategoryService::class;
    public $reactView = 'Admin/CategoryServices';
}
