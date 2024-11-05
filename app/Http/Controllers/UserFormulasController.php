<?php

namespace App\Http\Controllers;

use App\Models\UserFormulas;
use App\Http\Requests\StoreUserFormulasRequest;
use App\Http\Requests\UpdateUserFormulasRequest;
use App\Models\Formula;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserFormulasController extends BasicController
{
    public $model = UserFormulas::class;

    public function beforeSave(Request $request)
    {
        $body = $request->all();
        $body['fragrance_id'] = $body['fragrance'];
        $jpa = UserFormulas::where($body)->first();
        if ($jpa) $body['id'] = $jpa->id;

        if (Auth::check()) {
            $body['user_id'] = Auth::user()->id;
        }

        return $body;
    }
    public function afterSave(Request $request, object $jpa)
    {
        return $jpa;
    }
}
