<?php

namespace App\Http\Controllers;

use App\Models\Request;
use Exception;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Auth;

class RequestController extends BasicController
{
    public $model = Request::class;

    public function beforeSave(HttpRequest $request)
    {
        $coach_id = $request->coach_id;
        $coachee_id = Auth::user()->id;

        $data = [
            'coach_id' => $coach_id,
            'coachee_id' => $coachee_id
        ];

        $requestJpa = Request::select()
            ->where('coach_id', $coach_id)
            ->where('coachee_id', $coachee_id)
            ->first();

        if ($requestJpa && $requestJpa->status === 0) {
            throw new Exception('Ya tienes una solicitud pendiente');
        }

        return $data;
    }
}
