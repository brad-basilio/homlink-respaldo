<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Service;
use Illuminate\Http\Request;

class FaqController extends BasicController
{
    public $model = Faq::class;
    public $reactView = 'Admin/Faqs';
    public $softDeletion = false;

       public function setReactViewProperties(Request $request)
    {
        $services = Service::all();

        return [
            'services' => $services,

        ];
    }

       public function setPaginationInstance(string $model)
    {
        return $model::with(['service']);
    }
}
