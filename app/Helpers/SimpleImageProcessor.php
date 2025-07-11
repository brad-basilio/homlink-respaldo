<?php

namespace App\Helpers;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\Crypto;

class SimpleImageProcessor
{
    /**
     * Procesa una imagen: valida tamaño, comprime y convierte a WebP
     * 
     * @param UploadedFile $file
     * @param string $folder Carpeta donde guardar (ej: 'ads', 'banners')
     * @param int $maxSizeMB Tamaño máximo en MB (default: 1.5MB)
     * @param int $quality Calidad de compresión (default: 80)
     * @return array ['success' => bool, 'filename' => string, 'message' => string]
     */
    public static function processAndStore(UploadedFile $file, string $folder, int $maxSizeMB = 1, int $quality = 80): array
    {
        try {
            // 1. Validar tamaño del archivo original
            $maxSizeBytes = $maxSizeMB * 1024 * 1024; // Convertir MB a bytes
            if ($file->getSize() > $maxSizeBytes) {
                return [
                    'success' => false,
                    'filename' => null,
                    'message' => "La imagen es demasiado pesada. Máximo permitido: {$maxSizeMB}MB. Tu archivo: " . round($file->getSize() / 1024 / 1024, 2) . "MB"
                ];
            }

            // 2. Validar que sea una imagen
            $allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!in_array($file->getMimeType(), $allowedMimes)) {
                return [
                    'success' => false,
                    'filename' => null,
                    'message' => "Formato no válido. Solo se permiten: JPG, PNG, GIF, WebP"
                ];
            }

            // 3. Generar nombre único
            $uuid = Crypto::randomUUID();
            $filename = $uuid . '.webp'; // Siempre convertir a WebP

            // 4. Procesar imagen con Intervention Image
            $manager = new ImageManager(new Driver());
            $image = $manager->read($file->getPathname());
            
            // 5. Redimensionar si es muy grande (máximo 1920px de ancho)
            if ($image->width() > 1920) {
                $image->resize(1920, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
            }

            // 6. Comprimir y convertir a WebP
            $encodedImage = $image->toWebp($quality);

            // 7. Guardar en storage
            $path = "images/{$folder}/{$filename}";
            Storage::put($path, $encodedImage);

            return [
                'success' => true,
                'filename' => $filename,
                'message' => 'Imagen procesada y optimizada correctamente',
                'original_size' => $file->getSize(),
                'final_size' => strlen($encodedImage)
            ];

        } catch (\Exception $e) {
            return [
                'success' => false,
                'filename' => null,
                'message' => 'Error procesando imagen: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Valida una imagen antes de procesarla (para validación en frontend)
     */
    public static function validateImage(UploadedFile $file, int $maxSizeMB = 1): array
    {
        $errors = [];

        // Validar tamaño
        $maxSizeBytes = $maxSizeMB * 1024 * 1024;
        if ($file->getSize() > $maxSizeBytes) {
            $errors[] = "Imagen demasiado pesada. Máximo: {$maxSizeMB}MB, actual: " . round($file->getSize() / 1024 / 1024, 2) . "MB";
        }

        // Validar formato
        $allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!in_array($file->getMimeType(), $allowedMimes)) {
            $errors[] = "Formato no válido. Solo JPG, PNG, GIF, WebP";
        }

        return [
            'valid' => empty($errors),
            'errors' => $errors
        ];
    }
}
