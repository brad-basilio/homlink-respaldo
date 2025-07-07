<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use SoDe\Extend\Response;

class CambiaFXProxyController extends Controller
{
    private $baseURL = 'https://cambiafx.pe/api';

    public function getExchangeRates()
    {
        $response = Response::simpleTryCatch(function () {
            $apiResponse = Http::timeout(10)->get($this->baseURL . '/tc');
            
            if ($apiResponse->successful()) {
                return $apiResponse->json();
            }
            
            throw new \Exception('Error al obtener tipos de cambio de la API externa');
        });
        
        return response($response->toArray(), $response->status);
    }

    public function validateCoupon($code)
    {
        $response = Response::simpleTryCatch(function () use ($code) {
            $apiResponse = Http::timeout(10)->get($this->baseURL . '/cupon/' . $code);
            
            if ($apiResponse->successful()) {
                return $apiResponse->json();
            }
            
            throw new \Exception('Cupón no válido o error en la API externa');
        });
        
        return response($response->toArray(), $response->status);
    }
}
