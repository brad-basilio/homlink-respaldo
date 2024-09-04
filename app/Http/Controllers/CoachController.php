<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Faq;
use App\Models\SpecialtiesByUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use SoDe\Extend\File;
use SoDe\Extend\JSON;

class CoachController extends BasicController
{
    public $model = User::class;
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

        $countries = JSON::parse(File::get('../storage/app/utils/countries.json'));

        $events = Event::lastFour();

        $faqs = Faq::where('visible', true)->where('visible', true)->get();

        return [
            'specialties' => $specialties,
            'countries' => $countries,
            'events' => $events,
            'faqs' => $faqs,
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $this->model::select([
            DB::raw('DISTINCT(users.id)'),
            'users.*'
        ])
            ->with(['specialties'])
            ->join('model_has_roles AS mhr', 'mhr.model_id', 'users.id')
            ->leftJoin('specialties_by_users AS sbu', 'sbu.user_id', 'users.id')        // cambiar a solo join
            ->leftJoin('specialties AS specialty', 'specialty.id', 'sbu.specialty_id')  // cambiar a solo join
            ->where('mhr.role_id', 2)
            ->where('users.status', true);
    }

    public function specialCount(string $model): null|int
    {
        return $this->model::select(DB::raw('COUNT(DISTINCT(users.id)) as total_count'))
            ->join('model_has_roles AS mhr', 'mhr.model_id', 'users.id')
            ->leftJoin('specialties_by_users AS sbu', 'sbu.user_id', 'users.id')
            ->leftJoin('specialties AS specialty', 'specialty.id', 'sbu.specialty_id')
            ->where('mhr.role_id', 2)
            ->where('users.status', true)
            ->value('total_count');
    }
}
