<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\General;
use App\Models\Lang;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;
use SoDe\Extend\Response;

class GeneralController extends BasicController
{
    public $model = General::class;
    public $reactView = 'Admin/Generals';
    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        $generals = General::where('lang_id', $langId)->get();

        // Si no hay datos para el idioma actual, copiar del idioma por defecto
        if ($generals->isEmpty()) {
            $defaultLangId = Lang::where('is_default', true)->value('id');
            $defaultGenerals = General::where('lang_id', $defaultLangId)->get();

            foreach ($defaultGenerals as $general) {
                General::firstOrCreate([
                    'correlative' => $general->correlative,
                    'lang_id' => $langId
                ], [
                    'name' => $general->name,
                    'description' => $general->description
                ]);
            }

            $generals = General::where('lang_id', $langId)->get();
        }

        return [
            'generals' => $generals
        ];
    }
    /* public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        $generals = General::where('lang_id', $langId)->get();
        return [
            'generals' => $generals
        ];
    }*/

    public function save(Request $request): HttpResponse|ResponseFactory
    {
        // dump($request->all());
        $response = Response::simpleTryCatch(function () use ($request) {
            $body = $request->all();
            foreach ($body as $record) {
                General::updateOrCreate([
                    'lang_id' => app('current_lang_id'),
                    'correlative' => $record['correlative']
                ], [
                    'name' => $record['name'],
                    'description' => $record['description']
                ]);
            }
        });
        return response($response->toArray(), $response->status);
    }
    /*
    public function save(Request $request): HttpResponse|ResponseFactory
    {
        dump($request->all());
        $response = Response::simpleTryCatch(function () use ($request) {
            $body = $request->all();
            $langId = app('current_lang_id'); // Obtener el idioma actual

            foreach ($body as $record) {
                General::updateOrCreate([
                    'correlative' => $record['correlative'],
                    'lang_id' => $langId // Incluir el idioma en la condición
                ], [
                    'name' => $record['name'],
                    'description' => $record['description']
                ]);
            }
        });
        return response($response->toArray(), $response->status);
    }*/
}
