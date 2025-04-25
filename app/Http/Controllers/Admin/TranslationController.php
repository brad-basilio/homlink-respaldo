<?php

namespace App\Http\Controllers\Admin;

use App\Http\Classes\dxResponse;
use Illuminate\Http\Response as HttpResponse;
use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\dxDataGrid;
use App\Models\Lang;
use App\Models\Social;
use App\Models\Translation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use SoDe\Extend\File;
use SoDe\Extend\JSON;

class TranslationController extends BasicController
{
    public $model = Translation::class;
    public $reactView = 'Admin/Translations';

    public function setReactViewProperties(Request $request)
    {
        $currentLangId = app('current_lang_id');
        $defaultLang = Lang::where('is_default', true)->first();
        $icons = JSON::parse(File::get('../storage/app/utils/icons.json'));
        return [
            'icons' => $icons,
            'current_lang_id' => $currentLangId,
            'default_lang_id' => $defaultLang->id
        ];
    }

    public function paginate(Request $request): HttpResponse|ResponseFactory
    {
        $response = new dxResponse();
        try {
            $langId = $request->input('lang_id') ?? app('current_lang_id');

            // Obtener el idioma base (español)
            $langDefault = Lang::where('is_default', true)->first();
            //  dump('Lang', ['lang' => $langDefault]);
            // dump('LangId', ['langId' => $langDefault->id]);
            $langDefaultId = $langDefault->id;
            // Subconsulta base (en español)
            $baseQuery = Translation::query()
                ->select('id', 'group', 'key', 'value as value_base')
                ->where('lang_id', $langDefaultId);



            // LEFT JOIN con el idioma destino (inglés)
            $query = DB::table(DB::raw("({$baseQuery->toSql()}) as base"))
                //->mergeBindings($baseQuery->getQuery())
                ->leftJoin('translations as t', function ($join) use ($langId) {
                    $join->on('t.group', '=', 'base.group')
                        ->on('t.key', '=', 'base.key')
                        ->where('t.lang_id', '=', $langId); // ✅ este es el idioma traducido
                })
                ->select([
                    't.id as translation_id',
                    'base.id as id',
                    't.lang_id',
                    'base.group',
                    'base.key',
                    'base.value_base',
                    't.value as translated_value',
                    DB::raw('IFNULL(t.value, base.value_base) as value')
                ])->addBinding([$langDefaultId], 'select');


            // Filtro personalizado

            /*   if ($request->filter) {
                $query->where(function ($q) use ($request) {
                    dxDataGrid::filter($q, $request->filter ?? [], false);
                });
            }*/

            // Ordenamiento
            /*  if ($request->sort) {
                foreach ($request->sort as $sorting) {
                    $query->orderBy($sorting['selector'], $sorting['desc'] ? 'DESC' : 'ASC');
                }
            } else {
                $query->orderBy('base.group', 'ASC')->orderBy('base.key', 'ASC');
            }*/

            // Total count
            /*   $totalCount = 0;
            if ($request->requireTotalCount) {
                $countQuery = clone $query;
                $totalCount = $countQuery->count();
            }*/
            //  dump('Data', ['data' => $query->get()]);


            // Paginar resultados
            $data = $query->get(); /* $request->isLoadingAll
                ? $query->get()
                : $query->skip($request->skip ?? 0)->take($request->take ?? 10)->get();*/



            // Respuesta
            $response->status = 200;
            $response->message = 'Operación correcta';
            $response->data = $data;
            $response->totalCount = 10; // $totalCount;
            $response->summary = $this->setPaginationSummary($request, Translation::query());
        } catch (\Throwable $th) {
            $response->status = 400;
            $response->message = $th->getMessage() . ' Ln.' . $th->getLine();
        } finally {
            return response($response->toArray(), $response->status);
        }
    }


    public function translate(Request $request)
    {
        try {
            $validated = $request->validate([
                'group' => 'required|string',
                'key' => 'required|string',
                'value' => 'required|string',

            ]);
            $langId = $request->input('lang_id') ?? app('current_lang_id');
            // Verifica si ya existe la traducción para ese idioma
            $translation = Translation::where('group', $validated['group'])
                ->where('key', $validated['key'])
                ->where('lang_id', $langId)
                ->first();

            if ($translation) {
                // Actualiza la traducción
                $translation->value = $validated['value'];
                $translation->save();
            } else {
                $validated['lang_id'] = $langId;
                // Crea una nueva traducción
                Translation::create($validated);
            }

            return response()->json([
                'status' => true,
                'message' => 'Traducción guardada exitosamente',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 400);
        }
    }






    public function getByLang($langId)
    {
        $translations = Translation::where('lang_id', $langId)->get();

        $result = [];

        foreach ($translations as $t) {
            $result[$t->group][$t->key] = $t->value;
        }

        return response()->json($result);
    }
}
