<?php

namespace App\Jobs;

use App\Http\Controllers\LandingController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendLandingFormEmail implements ShouldQueue
{
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  private object $data;

  public function __construct(Request $data)
  {
    $this->data = $data;
  }

  public function handle()
  {
    $data = $this->data;
    try {
      LandingController::envioCorreo($data);
      LandingController::envioCorreoMundo($data);
    } catch (\Throwable $th) {
      
    }
  }
}
