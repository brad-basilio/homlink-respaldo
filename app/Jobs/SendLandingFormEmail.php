<?php

namespace App\Jobs;

use App\Http\Controllers\LandingController;
use App\Models\Landing;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendLandingFormEmail implements ShouldQueue
{
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  private Landing $data;

  public function __construct(Landing $data)
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
