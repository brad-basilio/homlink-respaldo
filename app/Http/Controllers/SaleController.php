<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;

class SaleController extends Controller
{
    static function create(array $sale, array $details): array
    {
        try {
            //code...
        } catch (\Throwable $th) {
            return [false, null];
        }
    }
}
