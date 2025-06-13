<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Subscription;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;
use SoDe\Extend\Response;
class SubscriptionController extends BasicController
{
   public $model = Subscription::class;
   public $reactView = 'Admin/Subscriptions';

   public function delete(Request $request, string $id)
   {
      $response = new Response();
      try {
         $deleted = $this->model::where('id', $id)
            ->delete();

         if (!$deleted) throw new Exception('No se ha eliminado ningun registro');

         $response->status = 200;
         $response->message = 'Operacion correcta';
      } catch (\Throwable $th) {
         $response->status = 400;
         $response->message = $th->getMessage();
      } finally {
         return response(
            $response->toArray(),
            $response->status
         );
      }
   }
}
