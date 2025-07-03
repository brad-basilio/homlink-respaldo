<?php

namespace App\Http\Controllers;

use App\Models\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AppController extends Controller
{
    public function index(Request $request)
    {
        $query = App::query();

        // Búsqueda
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('link', 'like', "%{$search}%");
            });
        }

        // Ordenamiento
        $sortBy = $request->get('sort', 'order');
        $sortDirection = $request->get('direction', 'asc');
        $query->orderBy($sortBy, $sortDirection);

        // Paginación
        $perPage = $request->get('take', 20);
        $apps = $query->paginate($perPage);

        return response()->json([
            'data' => $apps->items(),
            'totalCount' => $apps->total(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'link' => 'required|url|max:500',
            'order' => 'nullable|integer|min:1',
            'status' => 'nullable|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'link' => $request->link,
            'order' => $request->order ?? 1,
            'status' => $request->status ?? true,
        ];

        // Manejar la imagen
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/apps', $filename);
            $data['image'] = $filename;
        }

        $app = App::create($data);

        return response()->json([
            'message' => 'Aplicación creada exitosamente',
            'data' => $app,
        ], 201);
    }

    public function update(Request $request, App $app)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'link' => 'required|url|max:500',
            'order' => 'nullable|integer|min:1',
            'status' => 'nullable|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'link' => $request->link,
            'order' => $request->order ?? $app->order,
            'status' => $request->status ?? $app->status,
        ];

        // Manejar la imagen
        if ($request->hasFile('image')) {
            // Eliminar imagen anterior si existe
            if ($app->image && Storage::exists('public/apps/' . $app->image)) {
                Storage::delete('public/apps/' . $app->image);
            }

            $image = $request->file('image');
            $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/apps', $filename);
            $data['image'] = $filename;
        }

        $app->update($data);

        return response()->json([
            'message' => 'Aplicación actualizada exitosamente',
            'data' => $app,
        ]);
    }

    public function updateStatus(Request $request, App $app)
    {
        $request->validate([
            'status' => 'required|boolean',
        ]);

        $app->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Estado actualizado exitosamente',
            'data' => $app,
        ]);
    }

    public function destroy(App $app)
    {
        // Eliminar imagen si existe
        if ($app->image && Storage::exists('public/apps/' . $app->image)) {
            Storage::delete('public/apps/' . $app->image);
        }

        $app->delete();

        return response()->json([
            'message' => 'Aplicación eliminada exitosamente',
        ]);
    }

    public function media($filename)
    {
        $path = storage_path('app/public/apps/' . $filename);
        
        if (!file_exists($path)) {
            // Retornar imagen por defecto o 404
            return response()->json(['error' => 'Imagen no encontrada'], 404);
        }

        return response()->file($path);
    }

    // Método para obtener apps activas (para uso en frontend)
    public function active()
    {
        $apps = App::active()->ordered()->get();
        
        return response()->json([
            'data' => $apps,
        ]);
    }
}
