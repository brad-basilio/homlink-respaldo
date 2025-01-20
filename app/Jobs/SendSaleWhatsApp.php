<?php

namespace App\Jobs;

use App\Http\Controllers\WhatsAppController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendSaleWhatsApp implements ShouldQueue
{
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  private $data;

  public function __construct($data)
  {
    $this->data = $data;
  }

  public function handle()
  {
    $data = $this->data;
    try {
      WhatsAppController::sendSale($data);
    } catch (\Throwable $th) {
      // dump($th->getMessage());
    }
  }
}
