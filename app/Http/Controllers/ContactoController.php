<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contacto;

class ContactoController extends Controller
{
    public function viewContacto(){
        return view('Contactopage');
    }


    public function storeContacto(Request $request)
    {
        
        $contacto = Contacto::create($request->all());
        @dd;
        return redirect()->route('contacto', $contacto)->with('mensaje','Mensaje enviado exitoso');
    }
}
