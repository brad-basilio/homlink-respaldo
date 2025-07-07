<?php

namespace App\Http\Controllers;

use App\Models\Ad;
use App\Http\Requests\StoreAdRequest;
use App\Http\Requests\UpdateAdRequest;
use Illuminate\Http\JsonResponse;

class AdController extends BasicController
{
    public $throwMediaError = true;
    public $model = Ad::class;

    /**
     * Obtener popups/anuncios que deben mostrarse hoy
     * 
     * @return JsonResponse
     */
    public function today(): JsonResponse
    {
        try {
            $ads = Ad::today();
            
            return response()->json($ads->map(function ($ad) {
                return [
                    'id' => $ad->id,
                    'name' => $ad->name,
                    'description' => $ad->description,
                    'image' => $ad->image,
                    'link' => $ad->link,
                    'seconds' => (int) $ad->seconds,
                    'actions' => (int) $ad->actions,
                    'item_id' => $ad->item_id,
                    'invasivo' => (bool) $ad->invasivo,
                    'date_begin' => $ad->date_begin,
                    'date_end' => $ad->date_end,
                ];
            }));
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener popups del día',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
