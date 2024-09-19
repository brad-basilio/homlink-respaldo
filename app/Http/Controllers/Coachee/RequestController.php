<?php

namespace App\Http\Controllers\Coachee;

use App\Http\Controllers\BasicController;
use App\Models\Request;
use Illuminate\Support\Facades\Auth;

class RequestController extends BasicController
{
    public $model = Request::class;
    public $reactView = 'Coachee/Requests.jsx';

    public function setPaginationInstance(string $model)
    {
        return $model::with(['coach'])
            ->where('coachee_id', Auth::user()->id);
    }
}
