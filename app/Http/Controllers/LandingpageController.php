<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LandingpageController extends Controller
{
    public function viewLandingpage(){
        return view('Landingpage');
       }
}
