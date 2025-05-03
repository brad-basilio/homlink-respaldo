<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;

use App\Models\Solution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\Crypto;
use SoDe\Extend\Response;

class SolutionController extends BasicController

{
    public $model = Solution::class;
    public $reactView = 'Admin/Solutions';
    public $imageFields = ['image', 'image_secondary', 'image_banner'];

    public function beforeSave(Request $request)
    {
        $body = $request->all();

        // Procesar galería de imágenes
        $gallery = [];

        // Agregar imágenes nuevas
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $uuid = Crypto::randomUUID();
                $ext = $file->getClientOriginalExtension();
                $path = "images/solution/{$uuid}.{$ext}";
                Storage::put($path, file_get_contents($file));
                $gallery[] = "{$uuid}.{$ext}";
            }
        }

        // Mantener imágenes existentes
        if ($request->has('existing_gallery')) {
            $existing = json_decode($request->existing_gallery, true);
            $gallery = array_merge($gallery, $existing);
        }

        $body['gallery'] = $gallery;

        // Procesar características
        /*  if ($request->has('characteristics')) {
            $characteristics = json_decode($request->characteristics, true);
            $body['characteristics'] = array_values(array_filter($characteristics, function ($item) {
                return !empty(trim($item));
            }));
        }*/
        // Procesar características compuestas
        $processedCharacteristics = [];
        if ($request->has('characteristics')) {
            $characteristics = $request->characteristics;

            foreach ($characteristics as $index => $char) {
                $title = trim($char['title'] ?? '');
                $description = trim($char['description'] ?? '');
                $image = null;

                // Procesar imagen si se subió
                if ($request->hasFile("characteristics.{$index}.image")) {
                    $file = $request->file("characteristics.{$index}.image");
                    $uuid = Crypto::randomUUID();
                    $ext = $file->getClientOriginalExtension();
                    $path = "images/solution/{$uuid}.{$ext}";
                    Storage::put($path, file_get_contents($file));
                    $image = "{$uuid}.{$ext}";
                } elseif (!empty($char['existing_image'])) {
                    // Mantener imagen existente
                    $image = $char['existing_image'];
                } else {
                    // No hay imagen
                    $image = null;
                }

                // Solo agregar si hay al menos un campo con contenido
                if ($title || $description || $image) {
                    $processedCharacteristics[] = [
                        'title' => $title,
                        'description' => $description,
                        'image' => $image
                    ];
                }
            }
        }
        $body['characteristics'] = $processedCharacteristics;

        // Procesar beneficios (similar a características)
        $processedBenefits = [];
        if ($request->has('benefits')) {
            $benefits = $request->benefits;

            foreach ($benefits as $index => $benefit) {
                $title = trim($benefit['title'] ?? '');
                $description = trim($benefit['description'] ?? '');
                $image = null;

                if ($request->hasFile("benefits.{$index}.image")) {
                    $file = $request->file("benefits.{$index}.image");
                    $uuid = Crypto::randomUUID();
                    $ext = $file->getClientOriginalExtension();
                    $path = "images/solution/{$uuid}.{$ext}";
                    Storage::put($path, file_get_contents($file));
                    $image = "{$uuid}.{$ext}";
                } elseif (!empty($benefit['existing_image'])) {
                    $image = $benefit['existing_image'];
                } else {
                    // No hay imagen
                    $image = null;
                }

                if ($title || $description || $image) {
                    $processedBenefits[] = [
                        'title' => $title,
                        'description' => $description,
                        'image' => $image
                    ];
                }
            }
        }
        $body['benefits'] = $processedBenefits;

        return $body;
    }

    public function afterSave(Request $request, $solution)
    {
        // Eliminar imágenes marcadas para borrar (si implementas esta función)
        return $solution;
    }
}
