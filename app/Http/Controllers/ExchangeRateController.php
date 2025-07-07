<?php

namespace App\Http\Controllers;

use SoDe\Extend\Response;

class ExchangeRateController extends Controller
{
    public function getExchangeRates()
    {
        $response = Response::simpleTryCatch(function () {
            // Por ahora devolvemos datos simulados similar a la API real de CambiaFX
            // En el futuro puedes conectar con la API real o usar una base de datos
            return [
                ['id' => 1, 'desde' => 0, 'hasta' => 1000, 'tc_compra' => 3.5330, 'tc_venta' => 3.5650],
                ['id' => 2, 'desde' => 1001, 'hasta' => 5000, 'tc_compra' => 3.5340, 'tc_venta' => 3.5660],
                ['id' => 3, 'desde' => 5001, 'hasta' => 10000, 'tc_compra' => 3.5350, 'tc_venta' => 3.5670],
                ['id' => 4, 'desde' => 10001, 'hasta' => 999999, 'tc_compra' => 3.5360, 'tc_venta' => 3.5680]
            ];
        });
        return response($response->toArray(), $response->status);
    }
}
