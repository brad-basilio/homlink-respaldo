<?php

namespace App\Http\Controllers;

use App\Models\Supply;
use App\Http\Requests\StoreSupplyRequest;
use App\Http\Requests\UpdateSupplyRequest;

class SupplyController extends BasicController
{
    public $reactView = 'Supplies';
    public $reactRootView = 'public';
}
