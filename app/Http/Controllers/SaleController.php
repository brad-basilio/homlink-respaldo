<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Models\Item;
use App\Models\SaleDetail;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\Trace;
use SoDe\Extend\Array2;

class SaleController extends Controller
{
    static function create(array $sale, array $details): array
    {
        try {
            $itemsJpa = Item::whereIn('id', array_map(fn($item) => $item['id'], $details))->get();
            foreach ($itemsJpa as $itemJpa) {
                $item = Array2::find($details, fn($item) => $item['id'] == $itemJpa->id);
                $itemJpa->final_price = $itemJpa->discount != 0
                    ? $itemJpa->discount
                    : $itemJpa->price;
                $itemJpa->quantity = $item['quantity'];
                $itemJpa->colors = $item['colors'];
            }

            $saleJpa = new Sale();

            // Sale info
            $saleJpa->code = Trace::getId();
            $saleJpa->user_formula_id = $sale['user_formula_id'];
            $saleJpa->user_id = Auth::check() ? Auth::user()->id : null;
            $saleJpa->name = $sale['name'];
            $saleJpa->lastname = $sale['lastname'];
            $saleJpa->email = $sale['email'];
            $saleJpa->phone = $sale['phone'];

            // Address info
            $saleJpa->country = $sale['country'];
            $saleJpa->department = $sale['department'];
            $saleJpa->province = $sale['province'];
            $saleJpa->district = $sale['district'];
            $saleJpa->zip_code = $sale['zip_code'];
            $saleJpa->address = $sale['address'];
            $saleJpa->number = $sale['number'];
            $saleJpa->reference = $sale['reference'];
            $saleJpa->comment = $sale['comment'];

            // Sale Header
            $saleJpa->amount = array_sum(array_map(
                fn($item) => $item['final_price'] * $item['quantity'],
                $itemsJpa->toArray()
            ));
            $saleJpa->delivery = 0; // Agregar lógica si es que se tiene precio por envío
            $saleJpa->save();

            $detailsJpa = array();
            foreach ($itemsJpa as $itemJpa) {
                $detailJpa = new SaleDetail();
                $detailJpa->sale_id = $saleJpa->id;
                $detailJpa->item_id = $itemJpa->id;
                $detailJpa->name = $itemJpa->name;
                $detailJpa->price = $itemJpa->final_price;
                $detailJpa->quantity = $itemJpa->quantity;
                $detailJpa->colors = $itemJpa->colors;
                $detailJpa->save();

                $detailsJpa[] = $detailJpa->toArray();
            }

            return [true, array_merge(
                $saleJpa->toArray(),
                ['details' => $detailsJpa]
            )];
        } catch (\Throwable $th) {
            return [false, [
                'error' => $th->getMessage(),
                'file' => $th->getFile(),
                'line' => $th->getLine()
            ]];
        }
    }
}
