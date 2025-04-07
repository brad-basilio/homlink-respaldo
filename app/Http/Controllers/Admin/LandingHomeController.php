<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Ad;
use App\Models\Item;
use App\Models\LandingHome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LandingHomeController extends BasicController
{
    public $model = LandingHome::class;
    public $reactView = 'Admin/LandingHome';
    public $imageFields = ['image'];
    public $videoFields = ['video']; // Nuevo campo para videos
    //public $prefix4filter = 'landing_home';

    public function setReactViewProperties(Request $request)
    {
        $landingHome = LandingHome::all();

        return [
            'items' => $landingHome,

        ];
    }

    public function beforeSave(Request $request)
    {
        $body = $request->all();

        // Procesar checkbox is_video
        $body['is_video'] = $request->has('is_video') && $request->is_video;

        // Si es video, eliminar la imagen (si existe)
        if ($body['is_video'] && $request->hasFile('video')) {
            if ($request->has('existing_image')) {
                Storage::delete("images/landing_home/{$request->existing_image}");
                $body['image'] = null;
            }
        }
        // Si es imagen, eliminar el video (si existe)
        elseif (!$body['is_video'] && $request->hasFile('image')) {
            if ($request->has('existing_video')) {
                Storage::delete("videos/landing_home/{$request->existing_video}");
                $body['video'] = null;
            }
        }

        return $body;
    }

    public function afterSave(Request $request, $landingHome)
    {
        // Eliminar archivos antiguos si se subieron nuevos
        if ($request->has('delete_existing_image') && $request->delete_existing_image) {
            Storage::delete("images/landing_home/{$request->delete_existing_image}");
        }
        if ($request->has('delete_existing_video') && $request->delete_existing_video) {
            Storage::delete("videos/landing_home/{$request->delete_existing_video}");
        }

        return $landingHome;
    }

    /* public function setPaginationInstance(string $model)
    {
        return $model::with('item');
    }*/
}
