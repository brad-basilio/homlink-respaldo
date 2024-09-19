<?php

namespace App\Http\Controllers\Coach;

use App\Http\Controllers\BasicController;
use App\Models\Agreement;
use App\Models\Request;
use Illuminate\Http\Request as HttpRequest;

class AgreementController extends BasicController
{
    public $model = Agreement::class;

    public function setPaginationSummary(string $model)
    {
        $last = Agreement::orderBy('contract_number', 'desc')->first();
        $correlative = 1;
        if ($last) {
            $correlative = $last->contract_number + 1;
        }
        return [
            'contract_number' => $correlative
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::with(['coachee']);
    }

    public function beforeSave(HttpRequest $request)
    {
        $body = $request->all();

        $requestJpa = Request::find($request->request_id);
        $body['coach_id'] = $requestJpa->coach_id;
        $body['coachee_id'] = $requestJpa->coachee_id;
        
        $last = Agreement::orderBy('contract_number', 'desc')->first();
        $body['contract_number'] = 1;
        if ($last) {
            $bodt['contract_number'] = $last->contract_number + 1;
        }
        return $body;
    }

    public function afterSave(HttpRequest $request, object $jpa)
    {
        Request::where('id', $jpa->request_id)->update([
            'status' => true
        ]);
    }
}
