<?php

namespace App\Http\Controllers;

use Culqi\Culqi;
use Exception;
use Illuminate\Http\Request;
use SoDe\Extend\JSON;
use SoDe\Extend\Math;
use SoDe\Extend\Response;

class CulqiController extends Controller
{
  public function order(Request $request)
  {
    $response = Response::simpleTryCatch(function () use ($request) {
      $culqi = new Culqi(['api_key' => env('CULQI_PRIVATE_KEY')]);

      [$status, $sale] = SaleController::create($request->sale, $request->details);

      if (!$status) throw new Exception($sale['error']);

      $amount = $sale['amount'];

      if (isset($sale['bundle_discount'])) $amount -= $sale['bundle_discount'];
      if (isset($sale['renewal_discount'])) $amount -= $sale['renewal_discount'];
      if (isset($sale['coupon_discount'])) $amount -= $sale['coupon_discount'];

      $config = [
        "amount" => Math::ceil(($amount * 100)),
        "currency_code" => 'PEN',
        "description" => "Compra en " . env('APP_NAME'),
        "order_number" => '#' . env('APP_CORRELATIVE') . '-' . $sale['code'],
        "client_details" => array(
          "first_name" =>  $sale['name'],
          "last_name" => $sale['lastname'],
          "email" => $sale['email'],
          "phone_number" => $sale['phone'],
        ),
        "expiration_date" => time() + 24 * 60 * 60,
        "confirm" => false
      ];

      $charge = $culqi->Orders->create($config);

      if (gettype($charge) == 'string') {
        $res = JSON::parse((string) $charge);
        throw new Exception($res['user_message']);
      }
      return \array_merge((array) $charge, [
        'amount' => Math::ceil($amount, 2),
        'delivery' => $sale['delivery'],
      ]);
    });

    return response($response->toArray(), $response->status);
  }
}
