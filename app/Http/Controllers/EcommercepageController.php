<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactoPopup;

class EcommercepageController extends Controller
{
    public function viewEcommercepage(){
        return view('Ecommercepage');
    }

    public function storeContacto(Request $request)
    {
        

        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|integer|max:99999999999',
            'urlweb' => 'string|max:255',
        ];
    
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
            'telefono.integer' => 'El campo teléfono debe ser un número entero.',
           
        ];


        $request->validate($reglasValidacion, $mensajes);

        $contactopopup = ContactoPopup::create($request->all());
       
        return redirect()->route('ecommercepage', $contactopopup)->with('mensaje','Mensaje enviado exitoso');
    }
}
