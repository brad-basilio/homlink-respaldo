<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Sale;
use App\Models\Status;
use Illuminate\Http\Request;

class SaleController extends BasicController
{
    public $model = Sale::class;
    public $reactView = 'Admin/Sales';
    public $prefix4filter = 'sales';
    public $with4get = ['status', 'details', 'renewal', 'bundle', 'coupon'];

    public function setReactViewProperties(Request $request)
    {
        $statusesJpa = Status::select()
            ->where('status', true)
            ->where('visible', true)
            ->get();
        return [
            'statuses' => $statusesJpa
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::select('sales.*')
            ->with('status')
            ->join('statuses AS status', 'status.id', 'sales.status_id');
    }

    public function afterSave(Request $request, object $jpa)
    {
        $newJpa = Sale::with($this->with4get)->find($jpa->id);        
        return $newJpa;
    }
}
