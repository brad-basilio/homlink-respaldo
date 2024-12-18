<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\SaleDetail;
use Culqi\Culqi;
use Exception;
use Illuminate\Http\Request;
use SoDe\Extend\Crypto;
use SoDe\Extend\Fetch;
use SoDe\Extend\JSON;
use SoDe\Extend\Math;
use SoDe\Extend\Response;
use Illuminate\Support\Str;

class CulqiController extends Controller
{
  private $culqi = null;
  private $url = null;

  public function __construct()
  {
    $this->culqi = new Culqi(['api_key' => env('CULQI_PRIVATE_KEY')]);
    $this->url = env('CULQI_API');
  }

  public function order(Request $request)
  {
    $response = Response::simpleTryCatch(function () use ($request) {

      [$status, $sale] = SaleController::create($request->sale, $request->details);

      if (!$status) throw new Exception($sale['error']);

      if ($sale->renewal_id) $this->createPlan($sale);

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
        "expiration_date" => time() + (24 * 60 * 60),
        // "expiration_date" => time() + (60),
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
        $sale->update([
          'status_id' => 'd3a77651-15df-4fdc-a3db-91d6a8f4247c'
        ]);
        throw new Exception($res['user_message']);
      }

      $sale->update([
        'status_id' => '312f9a91-d3f2-4672-a6bf-678967616cac'
      ]);
    });
    return response($response->toArray(), $response->status);
  }

  private function createPlan(Sale $sale)
  {
    try {
      if (!$sale->renewal_id) throw new Exception('No hay una suscripción vinculada a la venta');

      $name = $sale->renewal->name . ' - ' . $sale->name . ' ' . $sale->lastname;
      $normalAmount = $sale->amount - $sale->bundle_discount - $sale->renewal_discount;
      
      $amount = $normalAmount / $sale->renewal->months;

      $discount = $normalAmount - $sale->coupon_discount;

      $res = new Fetch($this->url . '/plans/create', [
        'method' => 'POST',
        'headers' => [
          'Content-Type' => 'application/json',
          'Authorization' => 'Bearer ' . \env('CULQI_PRIVATE_KEY')
        ],
        'body' => [
          "name" => $name,
          "short_name" => Str::slug($name) . '-' . Crypto::short(),
          "description" => 'Plan ' . $name,
          "amount" => Math::ceil($amount * 100),
          "currency" => "PEN",
          "interval_unit_time" => 3, // 3 = Mensual
          "interval_count" => 0, // Ilimitado
          "initial_cycles" => [
            "count" => 1, // Solo primer mes
            "has_initial_charge" => $discount != 0,
            "amount" => Math::ceil($discount * 100),
            "interval_unit_time" => 3
          ],
          "metadata" => [
            "DNI" => 123456782
          ]
        ]
      ]);

      $data = $res->json();
    } catch (\Throwable $th) {
      return null;
    }
  }

  public function webhook(Request $request)
  {
    dump($request);
    return \response('OK');
  }
}
