<?php

namespace App\Http\Controllers\Coach;

use App\Http\Controllers\BasicController;
use App\Models\Resource;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResourceController extends BasicController
{
    public $model = Resource::class;
    public $reactView = 'Coach/Resources';

    public function setReactViewProperties(Request $request)
    {
        $specialties = Specialty::all();
        return [
            'specialties' => $specialties
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::with('specialty');
    }

    public function beforeSave(Request $request)
    {
        $body = $request->all();
        $body['owner_id'] = Auth::user()->id;
        return $body;
    }
}
