<?php

namespace App\Http\Controllers;

use App\Models\Landing;
use Illuminate\Http\Request;
use App\Http\Requests\StoreLandingRequest;
use App\Http\Requests\UpdateLandingRequest;

class LandingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function viewAplicativos()
    {
        return view('Landing/Landingaplicativos');
    }

    public function viewstoreLanding()
    {
        return view('Landing/Landingmundoweb');
    }

    public function viewstoreEcommerce()
    {
        return view('Landing/Landingecommerce');
    }

    public function viewstoreWebsite()
    {
        return view('Landing/Landingwebsite');
    }
    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeAplicativos(Request $request)
    {
        
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|integer|max:99999999999',
            
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

       
        $formlanding = Landing::create($request->all());
       
        
        return redirect()->route('landingaplicativos', $formlanding)->with('mensaje','Mensaje enviado exitoso')->with('name', $request->nombre);
    }


    public function storeLanding(Request $request)
    {
        
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|integer|max:99999999999',
            
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

       
        $formlanding = Landing::create($request->all());
       
        
        return redirect()->route('landingmundoweb', $formlanding)->with('mensaje','Mensaje enviado exitoso')->with('name', $request->nombre);
    }




    public function storeEcommerce(Request $request)
    {
        
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|integer|max:99999999999',
            
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

       
        $formlanding = Landing::create($request->all());
       
        
        return redirect()->route('landingecommerce', $formlanding)->with('mensaje','Mensaje enviado exitoso')->with('name', $request->nombre);
    }




    public function storeWebsite(Request $request)
    {
        
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|integer|max:99999999999',
            
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

       
        $formlanding = Landing::create($request->all());
       
        
        return redirect()->route('landingwebsite', $formlanding)->with('mensaje','Mensaje enviado exitoso')->with('name', $request->nombre);
    }
    /**
     * Display the specified resource.
     */
    public function show(Landing $landing)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Landing $landing)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLandingRequest $request, Landing $landing)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Landing $landing)
    {
        //
    }
}
