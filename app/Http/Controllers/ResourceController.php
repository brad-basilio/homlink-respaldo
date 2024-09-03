<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ResourceController extends BasicController
{
    public $model = Resource::class;
    public $reactView = 'Resources';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $resourcesJpa = Resource::with(['specialty'])
            ->where('status', true)->get();
        return [
            'resources' => $resourcesJpa
        ];
    }

    public function get(Request $request, string $resourceId)
    {
        $resource = Resource::with(['specialty'])->find($resourceId);

        return Inertia::render('ResourceDetails', [
            'session' => Auth::user(),
            'global' => [
                'PUBLIC_RSA_KEY' => Controller::$PUBLIC_RSA_KEY,
                'APP_NAME' => env('APP_NAME'),
                'APP_URL' => env('APP_URL'),
                'APP_DOMAIN' => env('APP_DOMAIN'),
                'APP_PROTOCOL' => env('APP_PROTOCOL', 'https'),
            ],
            'resource' => $resource
        ])->rootView($this->reactRootView);
    }
}
