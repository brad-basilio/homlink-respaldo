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
        $request->validate([
            'has_treatment' => 'required|string|min:36|max:36',
            'scalp_type' => 'required|string|min:36|max:36',
            'hair_type' => 'required|string|min:36|max:36',
            'hair_goals' => 'required|array',
            'email' => 'required|string|email|max:255',
        ]);

        $body = $request->all();
        $body['fragrance_id'] = $body['fragrance'];
        
        $jpa = UserFormulas::select()
            ->where('has_treatment', $body['has_treatment'])
            ->where('scalp_type', $body['scalp_type'])
            ->where('hair_type', $body['hair_type'])
            ->where('hair_goals', $body['hair_goals'])
            ->where('fragrance_id', $body['fragrance_id'])
            ->where('email', $body['email'])
            ->first();
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
