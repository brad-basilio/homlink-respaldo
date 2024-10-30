<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Culqi\Culqi;
use Illuminate\Http\Request;
use SoDe\Extend\Response;

class CulqiController extends Controller
{
    public function culqiOrder(Request $request)
    {
        $body = $request->all();
        $response = new Response();
        $culqi = new Culqi(['api_key' => env('CULQI_PRIVATE_KEY')]);
        foreach ($body['cart'] as $key => $item) {
            $body['cart'][$key]['id'] = (int) $item['id'];
            $body['cart'][$key]['quantity'] = (int) $item['quantity'];
            $body['cart'][$key]['isCombo'] = $item['isCombo'] == 'true' ? true : false;
        }

        $time = time();
        $sale = new Sale();
        $this->processSale($body, $sale, $response);
        $monto = round(($sale->total + $sale->precio_envio) * 100);


        $config = [
            "amount" => $monto, //minimo de 6 soles
            "currency_code" => 'PEN',
            "description" => "Compra en " . env('APP_NAME'),
            "order_number" => "#id-" . $time,
            "client_details" => array(
                "first_name" =>  $body['contact']['name'],
                "last_name" => $body['contact']['lastname'],
                "email" => $body['culqi']['email'] ?? $body['contact']['email'],
                "phone_number" => $body['contact']['phone'],
            ),
            "expiration_date" => $time + 24 * 60 * 60,
            "confirm" => false,
            // Orden con (01) dia de validez (hora-min-seg)
        ];

        try {
            $charge = $culqi->Orders->create($config);

            if (gettype($charge) == 'string') {
                $res = JSON::parse($charge);
                throw new Exception($res['user_message']);
            }

            $sale->code = $charge->order_number;

            $response->status = 200;
            $response->message = "Cargo creado correctamente";
            $response->data = [
                'charge' => $charge,
                'reference_code' => $charge?->reference_code ?? null,
                'amount' => $sale->total,
            ];

            // $this->finalizeSale($sale, $charge?->reference_code ?? null);
            // $this->sendEmail($sale);
        } catch (\Throwable $th) {

            $sale->status_id = 2;
            $response->status = 400;
            $response->message = $th->getMessage();
            $this->handleSaleError($sale);
        } finally {
            $sale->save();
            return response($response->toArray(), $response->status);
        }
    }
}
