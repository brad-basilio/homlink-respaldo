<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use SoDe\Extend\Response;

class ExchangeRateController extends Controller
{
    private $baseURL = 'https://cambiafx.pe/api';

    public function getExchangeRates()
    {
        $response = Response::simpleTryCatch(function () {
            // Intentar obtener datos de la API externa primero
            try {
                $apiResponse = Http::timeout(8)->get($this->baseURL . '/tc');
                
                if ($apiResponse->successful()) {
                    $data = $apiResponse->json();
                    Log::info('API externa exitosa:', ['data' => $data]);
                    return $data;
                }
            } catch (\Exception $e) {
                Log::warning('Error con API externa, usando datos de respaldo:', ['error' => $e->getMessage()]);
            }
            
            // Datos de respaldo si la API externa falla
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
