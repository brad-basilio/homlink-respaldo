<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\Crypto;
use SoDe\Extend\Response;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory as RoutingResponseFactory;
use SoDe\Extend\File;
use SoDe\Extend\JSON;
use SoDe\Extend\Text;

class ProfileController extends BasicController
{

  public $reactView = 'Profile';
  public $model = User::class;
  public $reactRootView = 'public';

  public function setReactViewProperties(Request $request)
  {
    $coach = User::where('uuid', $request->coach)->first();

    if (!$coach) return redirect('/');

    $countries = JSON::parse(File::get('../storage/app/utils/countries.json'));
    $country = array_filter($countries, function ($country) use ($coach) {
      return $country['id'] == $coach->country;
    });
    $country = reset($country);

    $resoources = Resource::where('owner_id', $coach->id)->get();

    return [
      'coach' => $coach,
      'country' => $country,
      'resources' => $resoources,
    ];
  }

  public function thumbnail(Request $request, $uuid)
  {
    try {
      $content = Storage::get('profile/thumbnail/' . $uuid . '.img');
      if (!$content) throw new Exception('Perfil no encontrado');
      return response($content, 200, [
        'Content-Type' => 'application/octet-stream'
      ]);
    } catch (\Throwable $th) {
      $content = Storage::get('utils/user-404.svg');
      return response($content, 200, [
        'Content-Type' => 'image/svg+xml'
      ]);
    }
  }

  public function full(Request $request, $uuid)
  {
    try {
      $content = Storage::get('profile/' . $uuid . '.img');
      if (!$content) throw new Exception('Perfil no encontrado');
      return response($content, 200, [
        'Content-Type' => 'application/octet-stream'
      ]);
    } catch (\Throwable $th) {
      $content = Storage::get('utils/user-404.svg');
      return response($content, 200, [
        'Content-Type' => 'image/svg+xml'
      ]);
    }
  }

  public function saveProfile(Request $request)
  {
    $response = new Response();
    try {
      $userId = Auth::user()->id;
      $userJpa = User::find($userId);
      if (!$userJpa->uuid) {
        $userJpa->uuid = Crypto::randomUUID();
        $userJpa->save();
      }

      $thumbnail = $request->file('thumbnail');
      $full = $request->file('full');

      $thumbnailPath = 'profile/thumbnail/' . $userJpa->uuid . '.img';
      $fullPath = 'profile/' . $userJpa->uuid . '.img';

      Storage::put($thumbnailPath, file_get_contents($thumbnail));
      Storage::put($fullPath, file_get_contents($full));

      $response->status = 200;
      $response->message = 'Operacion correcta';
      $response->data = [
        'uuid' => $userJpa->uuid
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

  public function beforeSave(Request $request)
  {
    $body = $request->all();

    if (isset($body['video'])) {
      $body['video'] = Text::getYTVideoId($body['video']);
    }

    $body['id'] = Auth::user()->id;
    return $body;
  }
}
