<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Benefit;
use Illuminate\Http\Request;

class BenefitController extends BasicController
{
    public $model = Benefit::class;
    public $reactView = 'Admin/Benefits';
    public $imageFields = ['image'];
}
