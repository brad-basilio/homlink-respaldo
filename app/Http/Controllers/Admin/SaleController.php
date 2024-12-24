<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Sale;
use App\Models\Status;
use Exception;
use Illuminate\Http\Request;
use SoDe\Extend\Response;

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

    public function afterSave(Request $request, object $jpa, bool $isNew)
    {
        $newJpa = Sale::with($this->with4get)->find($jpa->id);
        return $newJpa;
    }

    public function delete(Request $request, string $id)
    {
        $response = Response::simpleTryCatch(function () use ($request, $id) {
            $deleted =  $this->model::where('id', $id)
                ->update(['status_id' => 'c063efb2-1e9b-4a43-8991-b444c14d30dd']);

            if (!$deleted) throw new Exception('No se ha eliminado ningun registro');
        });
        return response(
            $response->toArray(),
            $response->status
        );
    }
}
