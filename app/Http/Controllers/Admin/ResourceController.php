<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Resource;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\Text;

class ResourceController extends BasicController
{
    public $model = Resource::class;
    public $reactView = 'Admin/Resources';

    public function setReactViewProperties(Request $request)
    {
        return [];
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
