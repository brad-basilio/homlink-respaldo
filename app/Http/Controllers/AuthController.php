<?php

namespace App\Http\Controllers;

use App\Http\Services\ReCaptchaService;
use App\Models\User;
use App\Models\PreUser;
use Exception;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use SoDe\Extend\Crypto;
use SoDe\Extend\Response;
use SoDe\Extend\Trace;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{

  public function loginView(Request $request, string $confirmation = null)
  {
    if (Auth::check()) {
      switch (Auth::user()->getRole()) {
        case 'Admin':
          return redirect('/admin/messages');
          break;
        case 'Customer':
          return redirect('/'); // Redirigir a la página principal
          break;

        default:
          Auth::guard('web')->logout();
          $request->session()->invalidate();
          $request->session()->regenerateToken();
          return redirect('/login');
          break;
      }
    };

    if ($confirmation) {
      $userJpa = new User();
      try {
        //code...
        $preUserJpa = PreUser::select()
          ->where('confirmation_token', $confirmation)
          ->first();
        if (!$preUserJpa) return redirect('/login');

        $roleJpa = Role::where('relative_id', $preUserJpa->role)->first();

        $userJpa = User::create([
          'uuid' => Crypto::randomUUID(),
          'name' => $preUserJpa->name,
          'lastname' => $preUserJpa->lastname,
          'email' => $preUserJpa->email,
          'birth_day' => $preUserJpa->birth_day,
          'birth_month' => $preUserJpa->birth_month,
          'email_verified_at' => Trace::getDate('mysql'),
          'password' => $preUserJpa->password,
          'notify_me' => $preUserJpa->notify_me,
          'status' => true
        ])->assignRole($roleJpa->name);

        $message = 'La confirmacion se ha realizado con exito';

        $preUserJpa->delete();
        return redirect('/login?message=' . $message);
      } catch (\Throwable $th) {
        $userJpa->delete();
        // dump($th);
        // return redirect('/login');
      }
    }

    return Inertia::render('Login', [
      'message' => $message ?? null,
      'global' => [
        'PUBLIC_RSA_KEY' => Controller::$PUBLIC_RSA_KEY,
        'APP_NAME' => env('APP_NAME', 'Trasciende'),
        'APP_URL' => env('APP_URL'),
        'APP_DOMAIN' => env('APP_DOMAIN'),
        'APP_PROTOCOL' => env('APP_PROTOCOL', 'https'),
      ],
    ])->rootView('auth');
  }

  public function registerView()
  {
    if (Auth::check()) return redirect('/'); // Redirigir a la página principal si ya está logueado

    $roles = Role::where('public', true)->get();

    return Inertia::render('Register', [
      'roles' => $roles,
      'APP_PROTOCOL' => env('APP_PROTOCOL', 'https'),
      'PUBLIC_RSA_KEY' => Controller::$PUBLIC_RSA_KEY,
      'RECAPTCHA_SITE_KEY' => env('RECAPTCHA_SITE_KEY'),
      'global' => [
        'APP_NAME' => env('APP_NAME', 'Trasciende'),
        'APP_URL' => env('APP_URL'),
        'APP_DOMAIN' => env('APP_DOMAIN'),
        'APP_PROTOCOL' => env('APP_PROTOCOL', 'https'),
      ]
    ])->rootView('auth');
  }

  public function confirmEmailView(Request $request, string $token)
  {
    if (Auth::check()) return redirect('/'); // Redirigir a la página principal si ya está logueado

    $preUserJpa = PreUser::where('token', $token)->first();
    if (!$preUserJpa) return redirect('/login');

    return Inertia::render('ConfirmEmail', [
      'email' => $preUserJpa->email,
      'global' => [
        'APP_NAME' => env('APP_NAME', 'Trasciende'),
        'APP_URL' => env('APP_URL'),
        'APP_DOMAIN' => env('APP_DOMAIN'),
        'APP_PROTOCOL' => env('APP_PROTOCOL', 'https'),
      ]
    ])->rootView('auth');
  }

  /**
   * Handle an incoming authentication request.
   */
  public function login(Request $request): HttpResponse | ResponseFactory | RedirectResponse
  {
    $response = Response::simpleTryCatch(function (Response $response) use ($request) {
      $email = Controller::decode($request->email);
      $password = Controller::decode($request->password);

      $userJpa = User::where('email', $email)->first();
      if (!$userJpa) throw new Exception('Este usuario que no existe');
      if ($userJpa->status == null) throw new Exception('Este usuario se encuentra baneado del sistema');
      if (!$userJpa->status) throw new Exception('Este usuario se encuentra inactivo');

      if (!Auth::attempt([
        'email' => $email,
        'password' => $password
      ])) {
        throw new Exception('Credenciales invalidas');
      }

      $request->session()->regenerate();
    });
    return response($response->toArray(), $response->status);
  }

  public function signup(Request $request): HttpResponse | ResponseFactory | RedirectResponse
  {
    $response = new Response();
    try {
      $request->validate([
        'name' => 'required|string|max:255',
        'lastname' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'phone' => 'nullable|string|max:20',
        'document' => 'nullable|string|max:20',
        'password' => 'required|string',
        'confirmation' => 'required|string',
        'captcha' => 'required|string',
      ]);

      $body = $request->all();

      if (!isset($request->password) || !isset($request->confirmation)) throw new Exception('Debes ingresar una contraseña para el nuevo usuario');
      if (Controller::decode($request->password) != Controller::decode($request->confirmation)) throw new Exception('Las contraseñas deben ser iguales');

      if (!ReCaptchaService::verify($request->captcha)) throw new Exception('Captcha invalido. Seguro que no eres un robot?');

      $roleJpa = Role::where('name', 'Customer')->first();

      if (!$roleJpa) throw new Exception('El rol que ingresaste no existe, que intentas hacer?');

      // Crear el usuario directamente en lugar de PreUser
      $userJpa = User::create([
        'uuid' => Crypto::randomUUID(),
        'name' => $body['name'],
        'lastname' => $body['lastname'],
        'email' => $body['email'],
        'phone' => $body['phone'],
        'dni' => $body['document'], // Mapear document a dni
        'email_verified_at' => Trace::getDate('mysql'),
        'password' => bcrypt(Controller::decode($body['password'])), // Encriptar con bcrypt
        'status' => true
      ])->assignRole($roleJpa->name);

      // Loguear automáticamente al usuario
      Auth::login($userJpa);
      $request->session()->regenerate();

      $response->status = 200;
      $response->message = 'Cuenta creada exitosamente. Bienvenido!';
      $response->data = [
        'redirect' => '/', // Redirigir a la página principal
        'user' => $userJpa->only(['name', 'lastname', 'email'])
      ];
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

  /**
   * Destroy an authenticated session.
   */
  public function destroy(Request $request)
  {
    $response = new Response();
    try {
      Auth::guard('web')->logout();

      $request->session()->invalidate();
      $request->session()->regenerateToken();

      $response->status = 200;
      $response->message = 'Cierre de sesion exitoso';
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
