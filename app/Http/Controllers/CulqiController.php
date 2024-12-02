<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Culqi\Culqi;
use Exception;
use Illuminate\Http\Request;
use SoDe\Extend\JSON;
use SoDe\Extend\Math;
use SoDe\Extend\Response;

class CulqiController extends Controller
{
  private $culqi = null;

  public function __construct()
  {
    $this->culqi = new Culqi(['api_key' => env('CULQI_PRIVATE_KEY')]);;
  }

  public function order(Request $request)
  {
    $response = Response::simpleTryCatch(function () use ($request) {

      [$status, $sale] = SaleController::create($request->sale, $request->details);

      if (!$status) throw new Exception($sale['error']);

      $amount = $sale['amount'];

      if (isset($sale['delivery'])) $amount += $sale['delivery'];
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
        // "expiration_date" => time() + (24 * 60 * 60),
        "expiration_date" => time() + (60),
        "confirm" => false
      ];

      $order = $this->culqi->Orders->create($config);

      if (gettype($order) == 'string') {
        $res = JSON::parse((string) $order);
        Sale::where('id', $sale['id'])->delete();
        throw new Exception($res['user_message']);
      }
      return \array_merge((array) $order, [
        'amount' => Math::ceil($amount, 2),
        'delivery' => $sale['delivery'],
      ]);
    });

    return response($response->toArray(), $response->status);
  }

  public function token(Request $request)
  {
    $response = Response::simpleTryCatch(function () use ($request) {
      $order_number = \str_replace('#' . env('APP_CORRELATIVE') . '-', '', $request->order);
      $sale = Sale::where('code', $order_number)->first();

      $amount = $sale->amount;
      if (isset($sale->delivery)) $amount += $sale->delivery;
      if (isset($sale->bundle_discount)) $amount -= $sale->bundle_discount;
      if (isset($sale->renewal_discount)) $amount -= $sale->renewal_discount;
      if (isset($sale->coupon_discount)) $amount -= $sale->coupon_discount;

      $config = [
        "amount" => Math::ceil(($amount * 100)),
        "capture" => true,
        "currency_code" => "PEN",
        "description" => "Compra en " . env('APP_NAME'),
        "email" => $request->token['email'] ?? $sale->email,
        "installments" => 0,
        "antifraud_details" => [
          "address" => $sale->address,
          "address_city" => $sale->district ?? 'Lima',
          "country_code" => "PE",
          "first_name" => $sale->name,
          "last_name" => $sale->lastname,
          "phone_number" => $sale->phone,
        ],
        "source_id" => $request->token['id']
      ];

      $charge = $this->culqi->Charges->create($config);

      if (gettype($charge) == 'string') {
        $res = JSON::parse((string) $charge);
        $sale->status_id = 'd3a77651-15df-4fdc-a3db-91d6a8f4247c';
        throw new Exception($res['user_message']);
      }

      $sale->status_id = '312f9a91-d3f2-4672-a6bf-678967616cac';
    });
    return response($response->toArray(), $response->status);
  }

  public function webhook(Request $request) {
    dump($request);
    return \response('OK');
  }
}
