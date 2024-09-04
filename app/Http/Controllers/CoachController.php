<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use App\Models\SpecialtiesByUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use SoDe\Extend\File;
use SoDe\Extend\JSON;

class CoachController extends BasicController
{
    public $reactView = 'Coaches';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $specialties = SpecialtiesByUser::select([
            DB::raw('DISTINCT(specialties.id)'),
            'specialties.id',
            'specialties.name'
        ])
            ->join('specialties', 'specialties.id', 'specialties_by_users.specialty_id')
            ->where('status', true)
            ->get();

        $coaches = User::select([
            'users.*'
        ])
            ->with(['specialties'])
            ->join('model_has_roles AS mhr', 'mhr.model_id', 'users.id')
            ->where('mhr.role_id', 2)
            ->get();
        $countries = JSON::parse(File::get('../storage/app/utils/countries.json'));
        return [
            'specialties' => $specialties,
            'coaches' => $coaches,
            'countries' => $countries,
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $this->model::select([
            'users.*'
        ])
            ->with(['specialties'])
            ->join('model_has_roles AS mhr', 'mhr.model_id', 'users.id')
            ->where('mhr.role_id', 2);
    }
}
