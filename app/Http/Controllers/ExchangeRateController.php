<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use SoDe\Extend\Response;

class ExchangeRateController extends Controller
{
    private $baseURL = 'https://apiluna.cambiafx.pe/api/BackendPizarra';
    private $idParCurrency = 1; // USD-PEN

    public function getExchangeRates()
    {
        $response = Response::simpleTryCatch(function () {
            // Intentar obtener datos de la nueva API de Luna
            try {
                $apiResponse = Http::timeout(8)->get($this->baseURL . '/getTcCustomerNoAuth', [
                    'idParCurrency' => $this->idParCurrency
                ]);
                
                if ($apiResponse->successful()) {
                    $data = $apiResponse->json();
                    Log::info('API Luna exitosa:', ['data' => $data]);
                    
                    // Mapear el formato de la nueva API al formato interno
                    $processedData = collect($data)->map(function ($item) {
                        return [
                            'id' => $item['idRange'],
                            'desde' => (float) $item['tcFrom'],
                            'hasta' => (float) $item['tcTo'],
                            'tc_compra' => (float) $item['tcBuy'],
                            'tc_venta' => (float) $item['tcSale'],
                            // Campos adicionales
                            'coupon' => $item['coupon'],
                            'amountMinOperation' => (float) $item['amountMinOperation'],
                            'amountMaxOperation' => (float) $item['amountMaxOperation']
                        ];
                    })->toArray();
                    
                    return $processedData;
                }
            } catch (\Exception $e) {
                Log::warning('Error con API Luna, usando datos de respaldo:', ['error' => $e->getMessage()]);
            }
            
            // Datos de respaldo si la API Luna falla
            return [
                ['id' => 1, 'desde' => 0, 'hasta' => 1000, 'tc_compra' => 3.5330, 'tc_venta' => 3.5650],
                ['id' => 2, 'desde' => 1001, 'hasta' => 5000, 'tc_compra' => 3.5340, 'tc_venta' => 3.5660],
                ['id' => 3, 'desde' => 5001, 'hasta' => 10000, 'tc_compra' => 3.5350, 'tc_venta' => 3.5670],
                ['id' => 4, 'desde' => 10001, 'hasta' => 999999, 'tc_compra' => 3.5360, 'tc_venta' => 3.5680]
            ];
        });
        
        return response($response->toArray(), $response->status);
    }
    
    public function validateCoupon($code)
    {
        $response = Response::simpleTryCatch(function () use ($code) {
            // Validar cupón con la nueva API de Luna
            $apiResponse = Http::timeout(8)->get($this->baseURL . '/getTcCustomerNoAuth', [
                'idParCurrency' => $this->idParCurrency,
                'codePromo' => $code
            ]);
            
            if ($apiResponse->successful()) {
                $data = $apiResponse->json();
                Log::info('Validación de cupón exitosa:', ['code' => $code, 'data' => $data]);
                
                // Mapear el formato de la nueva API al formato interno
                $processedData = collect($data)->map(function ($item) {
                    return [
                        'id' => $item['idRange'],
                        'desde' => (float) $item['tcFrom'],
                        'hasta' => (float) $item['tcTo'],
                        'tc_compra' => (float) $item['tcBuy'],
                        'tc_venta' => (float) $item['tcSale'],
                        // Campos adicionales
                        'coupon' => $item['coupon'],
                        'amountMinOperation' => (float) $item['amountMinOperation'],
                        'amountMaxOperation' => (float) $item['amountMaxOperation']
                    ];
                })->toArray();
                
                return $processedData;
            }
            
            throw new \Exception('Cupón no válido o error en la API');
        });
        
        return response($response->toArray(), $response->status);
    }
}
