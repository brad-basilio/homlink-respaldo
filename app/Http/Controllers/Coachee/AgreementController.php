<?php

namespace App\Http\Controllers\Coachee;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Agreement;
use App\Models\Request;
use Illuminate\Http\Request as HttpRequest;

class AgreementController extends BasicController
{
    public $model = Agreement::class;
}
