<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;

class ReCaptchaService extends BasicService
{
  static function verify($token)
  {
    // Skip reCAPTCHA verification in local development
    if (env('APP_ENV') === 'local' || env('APP_DOMAIN') === 'localhost') {
      return true;
    }

    $secret = env('RECAPTCHA_SECRET_KEY');
    $url = 'https://www.google.com/recaptcha/api/siteverify';

    try {
      $response = Http::asForm()->post($url, [
        'secret' => $secret,
        'response' => $token
      ]);
      $data = $response->json();
      return $data['success'];
    } catch (\Throwable $th) {
      return false;
    }
  }
}
