<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Benefit;
use Illuminate\Http\Request;
use SoDe\Extend\File;
use SoDe\Extend\JSON;

class BenefitController extends BasicController
{
   public $model = Benefit::class;
   public $reactView = 'Admin/Benefit';
   public $imageFields = ['image'];

   public function setReactViewProperties(Request $request)
   {
      $icons = JSON::parse(File::get('../storage/app/utils/icons.json'));
      return [
         'icons' => $icons
      ];
   }
}
