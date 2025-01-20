<?php

namespace App\Observers;

use App\Models\Sale;
use App\Models\SaleStatus;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\Fetch;

class SaleStatusObserver
{
    public function created(Sale $sale)
    {
        SaleStatus::create([
            'sale_id' => $sale->id,
            'status_id' => $sale->status_id,
            'user_id' => Auth::check() ? Auth::user()->id : null,
        ]);
    }

    // Registro de los cambios en el estado
    public function updating(Sale $sale)
    {
        if ($sale->isDirty('status_id')) {
            SaleStatus::create([
                'sale_id' => $sale->id,
                'status_id' => $sale->status_id,
                'user_id' => Auth::check() ? Auth::user()->id : null,
            ]);
            if ($sale->status_id == '312f9a91-d3f2-4672-a6bf-678967616cac') {
                try {
                    $address = ($sale->province ?? $sale->district) . ", {$sale->department}, {$sale->country}" . ($sale->zip_code ? ' - ' . $sale->zip_code : '');
                    new Fetch(env('WA_URL') . '/api/send', [
                        'method' => 'POST',
                        'headers' => [
                            'Content-Type' => 'application/json'
                        ],
                        'body' => [
                            'from' => env('APP_CORRELATIVE'),
                            'to' => [env('WAGROUP_VENTAS_ID')],
                            'content' => "*Nombre*: {$sale->name} {$sale->lastname}\n*Dirección*: {$sale->address} {$sale->number}, {$address}\n*Correo electrónico*: {$sale->email}\n*Teléfono*: {$sale->phone}",
                        ]
                    ]);
                } catch (\Throwable $th) {
                }
            }
        }
    }
}
