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

        // Has Treatment
        $httJpa = Formula::select('id')
            ->where('name', 'has_treatment')
            ->where('correlative', $request->has_treatment ? 'true' : 'false')
            ->first();
        $body['has_treatment'] = $httJpa->id;
        // Scalp Type
        $stJpa = Formula::select('id')
            ->where('name', 'scalp_type')
            ->where('correlative', $request->scalp_type)
            ->first();
        $body['scalp_type'] = $stJpa->id;
        // Hair Type
        $htJpa = Formula::select('id')
            ->where('name', 'hair_type')
            ->where('correlative', $request->hair_type)
            ->first();
        $body['hair_type'] = $htJpa->id;
        // Hair Goals
        $hgJpa = Formula::select('id')
            ->where('name', 'hair_goals')
            ->whereIn('correlative', $request->hair_goals)
            ->get();
        $body['hair_goals'] = array_map(fn($item) => $item['id'], $hgJpa->toArray());

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
