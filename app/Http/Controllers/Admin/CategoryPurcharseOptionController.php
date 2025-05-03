<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\CategoryPurcharseOption;
use Illuminate\Http\Request;

class CategoryPurcharseOptionController extends BasicController
{
    public $model = CategoryPurcharseOption::class;
    public $reactView = 'Admin/CategoryPurcharseOptions';
}
