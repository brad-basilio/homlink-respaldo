<?php

namespace App\Http\Controllers;

use App\Http\Classes\EmailConfig;
use App\Models\Form;
use Illuminate\Http\Request;
use App\Http\Requests\StoreFormRequest;
use App\Http\Requests\UpdateFormRequest;
use Exception;
use SoDe\Extend\Fetch;
use SoDe\Extend\JSON;
use SoDe\Extend\Response;
use SoDe\Extend\Text;

class FormController extends Controller
{

    public function saveInAtalaya(Request $request)
    {   
       
        $response = Response::simpleTryCatch(function (Response $response) use ($request) {
            $body = $request->all();
            $body['origin'] = $body['origin'] ?? '[Mundo Web] - Landing WebSite';
            $body['source'] = $body['source'] ?? 'Integracion API';
            $body['triggered_by'] = $body['triggered_by'] ?? 'Pauta';
            $res = new Fetch('https://crm.atalaya.pe/free/leads', [
                'method' => 'POST',
                'headers' => [
                    'Authorization' => 'Bearer dbb494f4-54d2-11ef-bfda-26a0a2e74226',
                    'Content-Type' => 'application/json'
                ],
                'body' => $body
            ]);
            $data = $res->json();
            if (!$res->ok) {
                throw new Exception($data['message'] ?? 'Ocurrio un error inespesperado al guardar los datos');
            }
        });
        return response($response->toArray(), $response->status);
    }

    public function store(Request $request)
    {
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required',
        ];
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
        ];
        $request->validate($reglasValidacion, $mensajes);
        $contactopopup = Form::create($request->all());
        return redirect()->route('ecommercepage', $contactopopup)->with('mensaje', 'Mensaje enviado exitoso')->with('name', $request->nombre);
    }

    public function store2(Request $request)
    {
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required',
        ];
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
        ];
        $request->validate($reglasValidacion, $mensajes);
        $contactopopup = Form::create($request->all());
        return redirect()->route('landingpage', $contactopopup)->with('mensaje', 'Mensaje enviado exitoso')->with('name', $request->nombre);
    }

    public function store3(Request $request)
    {
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required',
        ];
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
        ];
        $request->validate($reglasValidacion, $mensajes);
        $contactopopup = Form::create($request->all());
        return redirect()->route('onepage', $contactopopup)->with('mensaje', 'Mensaje enviado exitoso')->with('name', $request->nombre);
    }


    public function store4(Request $request)
    {
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required',
        ];
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
        ];
        $request->validate($reglasValidacion, $mensajes);
        $contactopopup = Form::create($request->all());
        return redirect()->route('aplicativospage', $contactopopup)->with('mensaje', 'Mensaje enviado exitoso')->with('name', $request->nombre);
    }


    public function store5(Request $request)
    {
        $reglasValidacion = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required',
        ];
        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.max' => 'El campo nombre no puede tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.max' => 'El campo correo electrónico no puede tener más de :max caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
        ];
        $request->validate($reglasValidacion, $mensajes);
        $formulariohome = Form::create($request->all());
        $this->envioCorreo($formulariohome);
        // return redirect()->route('inicio', $formulariohome)->with('mensaje','Mensaje enviado exitoso')->with('name', $request->nombre);
        return response()->json(['message' => 'Mensaje enviado con exito']);
    }

    public function thankyoupage()
    {
        return view('Thankyupage');
    }

    private function envioCorreo($data)
    {
        $name = $data['nombre'];
        $mail = EmailConfig::config($name); /* variable $name agregada */
        try {
            $mail->addAddress($data['email']);
            $mail->Body = "Buenas tardes $name su solicitud fue procesada";
            $mail->isHTML(true);
            $mail->send();
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
