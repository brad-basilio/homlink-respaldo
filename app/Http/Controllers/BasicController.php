<?php

namespace App\Http\Controllers;

use App\Http\Classes\dxResponse;
use App\Models\Aboutus;
use App\Models\Appointment;
use App\Models\Complaint;
use App\Models\dxDataGrid;
use App\Models\General;
use App\Models\Lang;
use App\Models\Message;
use App\Models\Service;
use App\Models\Slider;
use App\Models\Social;
use App\Helpers\SimpleImageProcessor;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use SoDe\Extend\Crypto;
use SoDe\Extend\Response;
use SoDe\Extend\Text;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;


class BasicController extends Controller
{
  public $model = Model::class;
  public $softDeletion = true;
  public $reactView = 'Home';
  public $reactRootView = 'admin';
  public $imageFields = [];
  public $videoFields = []; // Nuevo: Campos para videos
  
  public $prefix4filter = null;
  public $throwMediaError = false;
  public $reactData = null;
  public $with4get = [];

  public function __construct()
  {
    // Constructor simplificado
  }

  public function get(Request $request, string $id)
  {
    $response = Response::simpleTryCatch(function () use ($id) {
      $jpa  = $this->model::with($this->with4get)->find($id);
      if (!$jpa) throw new Exception('El pedido que buscas no existe');
      return $jpa;
    });
    return \response($response->toArray(), $response->status);
  }

  public function media(Request $request, string $uuid)
  {

    try {
      $snake_case = Text::camelToSnakeCase(str_replace('App\\Models\\', '', $this->model));
      if ($snake_case === 'item_image' || $snake_case === 'item_color') {
        $snake_case = 'item';
      }

      if (Text::has($uuid, '.')) {
        $route = "images/{$snake_case}/{$uuid}";
      } else {
        $route = "images/{$snake_case}/{$uuid}.img";
      }
      $content = Storage::get($route);
      if (!$content) throw new Exception('Imagen no encontrado');
      return response($content, 200, [
        'Content-Type' => 'application/octet-stream'
      ]);
    } catch (\Throwable $th) {

      $content = Storage::get('utils/cover-404.svg');
      $status = 200;
      if ($this->throwMediaError) return null;
      return response($content, $status, [
        'Content-Type' => 'image/svg+xml'
      ]);
    }
  }

  public function video(Request $request, string $uuid)
  {

    try {
      $snake_case = Text::camelToSnakeCase(str_replace('App\\Models\\', '', $this->model));
      if ($snake_case === 'item_image' || $snake_case === 'item_color') {
        $snake_case = 'item';
      }

      if (Text::has($uuid, '.')) {
        $route = "videos/{$snake_case}/{$uuid}";
      } else {
        $route = "videos/{$snake_case}/{$uuid}.mp4";
      }
      $content = Storage::get($route);
      if (!$content) throw new Exception('Imagen no encontrado');
      return response($content, 200, [
        'Content-Type' => 'application/octet-stream'
      ]);
    } catch (\Throwable $th) {

      $content = Storage::get('utils/cover-404.svg');
      $status = 200;
      if ($this->throwMediaError) return null;
      return response($content, $status, [
        'Content-Type' => 'image/svg+xml'
      ]);
    }
  }

  public function file(Request $request, string $uuid)
  {

    try {
      $snake_case = Text::camelToSnakeCase(str_replace('App\\Models\\', '', $this->model));
      if ($snake_case === 'item_image' || $snake_case === 'item_color') {
        $snake_case = 'item';
      }

      if (Text::has($uuid, '.')) {
        $route = "files/{$snake_case}/{$uuid}";
      } else {
        $route = "files/{$snake_case}/{$uuid}.mp4";
      }
      $content = Storage::get($route);
      if (!$content) throw new Exception('Imagen no encontrado');
      return response($content, 200, [
        'Content-Type' => 'application/octet-stream'
      ]);
    } catch (\Throwable $th) {

      $content = Storage::get('utils/cover-404.svg');
      $status = 200;
      if ($this->throwMediaError) return null;
      return response($content, $status, [
        'Content-Type' => 'image/svg+xml'
      ]);
    }
  }
  public function setPaginationInstance(string $model)
  {
    return $model::select();
  }

  public function setPaginationSummary(Request $request, Builder $builder)
  {
    return [];
  }

  public function setReactViewProperties(Request $request)
  {
    return [];
  }

  public function reactView(Request $request)
  {
    $properties = [];
    
    // Only fetch user permissions if authenticated
    if (Auth::check()) {
      $user = Auth::user();
      $user->getAllPermissions();
      $properties['session'] = $user;
    }

    // Use a database transaction to reuse the same connection for all queries
    DB::connection()->transaction(function() use (&$properties) {
      // Execute all queries within the same connection to reduce the number of active connections
      $properties['messagesCount'] = Message::where('status', true)->where('seen', false)->count();
      $properties['citasCount'] = Appointment::where('status', true)->where('seen', false)->count();
      $properties['languagesSystem'] = Lang::where('status', true)->where('visible', true)->get();
      $properties['reclamosCount'] = Complaint::where('estado', '=', 'pendiente')->count();
      $properties['linkWhatsApp'] = Social::where('description', '=', 'WhatsApp')->first();
      $properties['randomImage'] = Service::where('status', true)->where('visible', true)->inRandomOrder()->first();
      $properties['socials'] = Social::where('status', true)->where('visible', true)->get();
    });
    
    $properties['global'] = [
        'PUBLIC_RSA_KEY' => Controller::$PUBLIC_RSA_KEY,
        'APP_NAME' => env('APP_NAME', 'Trasciende'),
        'APP_URL' => env('APP_URL'),
        'APP_DOMAIN' => env('APP_DOMAIN'),
        'APP_CORRELATIVE' => env('APP_CORRELATIVE'),
        'APP_PROTOCOL' => env('APP_PROTOCOL', 'https'),
        'GMAPS_API_KEY' => env('GMAPS_API_KEY')
    ];
    $reactViewProperties = $this->setReactViewProperties($request);
    if (\is_array($reactViewProperties)) {
      foreach ($this->setReactViewProperties($request) as $key => $value) {
        $properties[$key] = $value;
      }
    } else {
      return $reactViewProperties;
    }
    return Inertia::render($this->reactView, $properties)
      ->rootView($this->reactRootView)
      ->withViewData('data', $this->reactData ?? []);
  }

  public function paginate(Request $request): HttpResponse|ResponseFactory
  {
    $response = new dxResponse();
    try {
      // [NUEVO] Obtener el idioma actual - verificando si el binding existe
      $langId = null;
      if (app()->bound('current_lang_id')) {
        $langId = app('current_lang_id');
      }
      
      // Use a single database connection for all queries in this method
      DB::connection()->beginTransaction();
      
      // [MODIFICADO] Aplicar with dinámicamente + filtro de idioma
      $instance = $this->setPaginationInstance($this->model)
        ->when($langId && Schema::hasColumn((new $this->model)->getTable(), 'lang_id'), function ($query) use ($langId) {
          $query->where('lang_id', $langId); // Filtra solo si el modelo tiene lang_id
        })
        ->with($request->has('with') ? explode(',', $request->with) : []);

      /* $withRelations = $request->has('with') ? explode(',', $request->with) : [];

      // Aplicar with dinámicamente
      $instance = $this->setPaginationInstance($this->model)->with($withRelations);*/


      if ($request->group != null) {
        [$grouping] = $request->group;
        $selector = $grouping['selector'];
        if ($this->prefix4filter && !str_contains($selector, '.')) {
          $selector = $this->prefix4filter . '.' . $selector;
        }
        $instance = $instance->select([
          DB::raw("{$selector} AS 'key'")
        ])
          ->groupBy($selector);
      }

      if (Auth::check()) {
        $table = $this->prefix4filter ? $this->prefix4filter : (new $this->model)->getTable();
        if (Schema::hasColumn($table, 'status')) {
          $instance->whereNotNull($this->prefix4filter ? $this->prefix4filter . '.status' : 'status');
          $instance->where($this->prefix4filter ? $this->prefix4filter . '.status' : 'status', true);
        }
      }

      if ($request->filter) {
        $instance->where(function ($query) use ($request) {
          dxDataGrid::filter($query, $request->filter ?? [], false, $this->prefix4filter);
        });
      }


      if ($request->group == null) {
        if ($request->sort != null) {
          foreach ($request->sort as $sorting) {
            $selector = $sorting['selector'];
            $instance->orderBy(
              $selector,
              $sorting['desc'] ? 'DESC' : 'ASC'
            );
          }
        } else { //MEJORAR IMPLMENTAR ASC O DESC DESDE EL REST, PARA MEJORARLO LA INTERACTIVIDAD CON OTRAS TABLAS
          $instance->orderBy($this->prefix4filter ? $this->prefix4filter . '.id' : 'id', 'ASC');
        }
      }

      $totalCount = 0;
      if ($request->requireTotalCount) {
        $instance4count = clone $instance;
        $instance4count->getQuery()->groups = null;
        if ($request->group != null) {
          // When grouping, count distinct groups
          $totalCount = $instance4count->distinct()->count(DB::raw($selector));
        } else {
          // When not grouping, use the original count logic
          if ($this->prefix4filter) {
            $totalCount = $instance4count->distinct()->count($this->prefix4filter . '.id');
          } else {
            $totalCount = $instance4count->distinct()->count('id');
          }
        }
      }

      $jpas = $request->isLoadingAll
        ? $instance->get()
        : $instance
        ->skip($request->skip ?? 0)
        ->take($request->take ?? 10)
        ->get();

      $response->status = 200;
      $response->message = 'Operación correcta';
      $response->data = $jpas;
      $response->summary = $this->setPaginationSummary($request, $instance);
      $response->totalCount = $totalCount;
      
      // Commit the transaction on success
      if (DB::connection()->transactionLevel() > 0) {
        DB::connection()->commit();
      }
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage() . ' Ln.' . $th->getLine();
      
      // Rollback on error
      if (DB::connection()->transactionLevel() > 0) {
        DB::connection()->rollBack();
      }
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }

  public function beforeSave(Request $request)
  {
    return $request->all();
  }

  public function save(Request $request): HttpResponse|ResponseFactory
  {
    $response = new Response();
    try {
      // Start a transaction to ensure all database operations use the same connection
      DB::connection()->beginTransaction();
      
      $body = $this->beforeSave($request);

      $snake_case = Text::camelToSnakeCase(str_replace('App\\Models\\', '', $this->model));
      if ($snake_case === "item_image" || $snake_case === "item_color" || $snake_case === "item_zise") {
        $snake_case = 'item';
      }

      // Procesar imágenes - Sistema simple con validación y compresión
      foreach ($this->imageFields as $field) {
        if (!$request->hasFile($field)) continue;
        
        $file = $request->file($field);
        
        // Usar SimpleImageProcessor para validar, comprimir y optimizar
        $result = SimpleImageProcessor::processAndStore($file, $snake_case, 1.5); // Máximo 1.5MB
        
        if (!$result['success']) {
          // Si hay error, retornar mensaje específico
          $response = new Response();
          $response->status = 422;
          $response->message = $result['message'];
          return \response($response->toArray(), $response->status);
        }
        
        // Guardar el nombre del archivo optimizado
        $body[$field] = $result['filename'];
      }

      // Procesar videos
      foreach ($this->videoFields as $field) {
        if (!$request->hasFile($field)) continue;
        $full = $request->file($field);
        $uuid = Crypto::randomUUID();
        $ext = $full->getClientOriginalExtension();
        $path = "videos/{$snake_case}/{$uuid}.{$ext}";
        Storage::put($path, file_get_contents($full));
        $body[$field] = "{$uuid}.{$ext}";
      }

      // Asignar lang_id si el modelo lo tiene y no fue enviado
      $langId = null;
      if (app()->bound('current_lang_id')) {
        $langId = app('current_lang_id');
      }
      $table = (new $this->model)->getTable();
      if (Schema::hasColumn($table, 'lang_id') && !isset($body['lang_id'])) {
        $body['lang_id'] = $langId;
      }

      // Crear o actualizar registro
      $jpa = $this->model::find(isset($body['id']) ? $body['id'] : null);
      $isNew = !$jpa; // Determinar si es un nuevo registro
      
      if (!$jpa) {
        $body['slug'] = Crypto::randomUUID();
        $jpa = $this->model::create($body);
      } else {
        $jpa->update($body);
      }

      // Generar slug único si el modelo tiene columna 'slug'
      if (Schema::hasColumn($table, 'slug')) {
        $slugSource = $jpa->name ?? $jpa->title ?? null;
        if ($slugSource) {
          $slug = Str::slug($slugSource);
          $slugExists = $this->model::where('slug', $slug)->where('id', '<>', $jpa->id)->exists();
          if ($slugExists) {
            $slug = $slug . '-' . Crypto::short();
          }
          $jpa->update(['slug' => $slug]);
        }
      }

      // Post-guardado
      $data = $this->afterSave($request, $jpa, $isNew);
      if ($data) {
        $response->data = $data;
      }

      $response->status = 200;
      $response->message = 'Operacion correcta';
      
      // Commit the transaction on success
      DB::connection()->commit();
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage();
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }


  public function afterSave(Request $request, object $jpa, ?bool $isNew)
  {
    return null;
  }

  public function status(Request $request)
  {
    $response = new Response();
    try {
      // Start a transaction to ensure all database operations use the same connection
      DB::connection()->beginTransaction();
      
      $this->model::where('id', $request->id)
        ->update([
          'status' => $request->status ? 0 : 1
        ]);

      $response->status = 200;
      $response->message = 'Operacion correcta';
      
      // Commit the transaction on success
      DB::connection()->commit();
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage();
      
      // Rollback on error
      if (DB::connection()->transactionLevel() > 0) {
        DB::connection()->rollBack();
      }
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }

  public function boolean(Request $request)
  {
    $response = new Response();
    try {
      // 🔧 DEBUG: Log de datos recibidos
      Log::info('🔧 BOOLEAN METHOD - Datos recibidos:', [
        'id' => $request->id,
        'field' => $request->field,
        'value' => $request->value,
        'value_type' => gettype($request->value),
        'model' => $this->model,
        'all_request_data' => $request->all()
      ]);

      // 🔧 DEBUG: Verificar estructura de la tabla
      if ($request->field === 'visible') {
        $tableName = (new $this->model)->getTable();
        $columns = DB::select("DESCRIBE {$tableName}");
        $visibleColumn = collect($columns)->firstWhere('Field', 'visible');
        
        Log::info('🗃️ TABLE STRUCTURE - visible column:', [
          'table_name' => $tableName,
          'visible_column_info' => $visibleColumn,
          'mysql_version' => DB::select('SELECT VERSION() as version')[0]->version ?? 'unknown'
        ]);
      }

      // Start a transaction to ensure all database operations use the same connection
      DB::connection()->beginTransaction();
      
      // 🔧 DEBUG: Verificar registro antes de actualizar
      $recordBefore = $this->model::where('id', $request->id)->first();
      Log::info('📝 BEFORE UPDATE:', [
        'record_exists' => $recordBefore ? true : false,
        'current_visible_value' => $recordBefore?->{$request->field} ?? 'NOT_FOUND',
        'current_visible_type' => $recordBefore ? gettype($recordBefore->{$request->field}) : 'NO_RECORD'
      ]);
      
      $data = [];
      $data[$request->field] = $request->value;

      // 🔧 DEBUG: Log de datos que se van a actualizar
      Log::info('💾 UPDATE DATA:', [
        'data_to_update' => $data,
        'field_value_type' => gettype($data[$request->field])
      ]);

      $updateResult = $this->model::where('id', $request->id)
        ->update($data);

      // 🔧 DEBUG: Resultado de la actualización
      Log::info('✅ UPDATE RESULT:', [
        'affected_rows' => $updateResult,
        'update_successful' => $updateResult > 0
      ]);

      // 🔧 DEBUG: Verificar registro después de actualizar
      $recordAfter = $this->model::where('id', $request->id)->first();
      Log::info('📝 AFTER UPDATE:', [
        'new_visible_value' => $recordAfter?->{$request->field} ?? 'NOT_FOUND',
        'new_visible_type' => $recordAfter ? gettype($recordAfter->{$request->field}) : 'NO_RECORD',
        'value_changed' => $recordBefore && $recordAfter ? 
          ($recordBefore->{$request->field} !== $recordAfter->{$request->field}) : 'UNKNOWN'
      ]);

      $response->status = 200;
      $response->message = 'Operacion correcta';
      
      // Commit the transaction on success
      DB::connection()->commit();
    } catch (\Throwable $th) {
      // 🔧 DEBUG: Log de errores
      Log::error('❌ BOOLEAN METHOD ERROR:', [
        'error_message' => $th->getMessage(),
        'error_trace' => $th->getTraceAsString()
      ]);
      
      $response->status = 400;
      $response->message = $th->getMessage();
      
      // Rollback on error
      if (DB::connection()->transactionLevel() > 0) {
        DB::connection()->rollBack();
      }
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }

  public function delete(Request $request, string $id)
  {
    $response = new Response();
    try {
      // Start a transaction to ensure all database operations use the same connection
      DB::connection()->beginTransaction();
      
      // ✅ CORREGIDO: Verificar si la tabla tiene columna 'status' antes de intentar soft delete
      $table = (new $this->model)->getTable();
      $hasStatusColumn = Schema::hasColumn($table, 'status');
      
      $deleted = $this->softDeletion && $hasStatusColumn
        ? $this->model::where('id', $id)->update(['status' => false])
        : $this->model::where('id', $id)->delete();

      if (!$deleted) throw new Exception('No se ha eliminado ningun registro');

      $response->status = 200;
      $response->message = 'Operacion correcta';
      
      // Commit the transaction on success
      DB::connection()->commit();
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage();
      
      // Rollback on error
      if (DB::connection()->transactionLevel() > 0) {
        DB::connection()->rollBack();
      }
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }

  /**
   * Determinar el tipo de modelo para configuración específica de imágenes
   */
  protected function getModelTypeForImage(string $modelName, string $fieldName): string
  {
    // Mapeo específico por modelo
    $modelMapping = [
      'banner' => 'banner',
      'slider' => 'slider',
      'ad' => 'banner',
      'item' => 'product',
      'post' => 'post',
      'user' => 'avatar',
      'staff' => 'avatar',
      'brand' => 'logo',
      'social' => 'logo',
      'general' => 'logo'
    ];

    // Mapeo específico por campo
    $fieldMapping = [
      'avatar' => 'avatar',
      'logo' => 'logo',
      'banner' => 'banner',
      'image' => 'product',
      'photo' => 'product',
      'picture' => 'product'
    ];

    // Primero buscar por nombre de campo
    if (isset($fieldMapping[$fieldName])) {
      return $fieldMapping[$fieldName];
    }

    // Luego buscar por modelo
    if (isset($modelMapping[$modelName])) {
      return $modelMapping[$modelName];
    }

    // Por defecto
    return 'product';
  }
}
