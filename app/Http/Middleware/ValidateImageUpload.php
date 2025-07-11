<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;

class ValidateImageUpload
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Log de debugging
        Log::info('ValidateImageUpload middleware ejecutado', [
            'url' => $request->url(),
            'method' => $request->method(),
            'hasFiles' => $request->hasFile('image'),
            'allFiles' => array_keys($request->allFiles()),
            'contentType' => $request->header('Content-Type')
        ]);

        // Configuración
        $maxFileSize = config('image.max_file_size', 5 * 1024 * 1024); // 5MB
        $allowedFormats = config('image.formats', ['jpg', 'jpeg', 'png', 'gif', 'webp']);
        $maxWidth = config('image.max_width', 2048);
        $maxHeight = config('image.max_height', 2048);

        // Buscar archivos de imagen en la request
        $imageFields = $this->findImageFields($request);
        
        Log::info('Campos de imagen encontrados', [
            'fields' => array_keys($imageFields),
            'count' => count($imageFields)
        ]);

        foreach ($imageFields as $field => $file) {
            if ($file instanceof UploadedFile) {
                try {
                    Log::info('Validando archivo', [
                        'field' => $field,
                        'originalName' => $file->getClientOriginalName(),
                        'size' => $file->getSize(),
                        'mimeType' => $file->getMimeType()
                    ]);
                    
                    $this->validateImageFile($file, $maxFileSize, $allowedFormats, $maxWidth, $maxHeight);
                    
                    Log::info('Archivo validado exitosamente', ['field' => $field]);
                } catch (\Exception $e) {
                    Log::error('Error en validación de imagen', [
                        'field' => $field,
                        'error' => $e->getMessage()
                    ]);
                    
                    return response()->json([
                        'success' => false,
                        'message' => 'Error en el campo ' . $field . ': ' . $e->getMessage(),
                        'field' => $field
                    ], 422);
                }
            }
        }

        return $next($request);
    }

    /**
     * Find image fields in the request
     */
    private function findImageFields(Request $request): array
    {
        $imageFields = [];
        $imageFieldNames = ['image', 'photo', 'picture', 'avatar', 'logo', 'banner', 'thumbnail'];

        // Buscar campos que terminen con palabras relacionadas a imágenes
        foreach ($request->allFiles() as $key => $file) {
            $isImageField = false;
            
            // Verificar si el nombre del campo indica que es una imagen
            foreach ($imageFieldNames as $imageName) {
                if (str_contains(strtolower($key), $imageName)) {
                    $isImageField = true;
                    break;
                }
            }

            // También verificar por extensión de archivo
            if (!$isImageField && $file instanceof UploadedFile) {
                $extension = strtolower($file->getClientOriginalExtension());
                $imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
                if (in_array($extension, $imageExtensions)) {
                    $isImageField = true;
                }
            }

            if ($isImageField) {
                $imageFields[$key] = $file;
            }
        }

        return $imageFields;
    }

    /**
     * Validate individual image file
     */
    private function validateImageFile(UploadedFile $file, int $maxFileSize, array $allowedFormats, int $maxWidth, int $maxHeight): void
    {
        // Validar tamaño de archivo
        if ($file->getSize() > $maxFileSize) {
            throw new \Exception('El archivo es demasiado grande. Tamaño máximo permitido: ' . $this->formatBytes($maxFileSize) . '. Tamaño actual: ' . $this->formatBytes($file->getSize()));
        }

        // Validar extensión
        $extension = strtolower($file->getClientOriginalExtension());
        if (!in_array($extension, $allowedFormats)) {
            throw new \Exception('Formato de archivo no permitido. Formatos permitidos: ' . implode(', ', $allowedFormats));
        }

        // Validar que sea una imagen real
        $imageInfo = getimagesize($file->getPathname());
        if (!$imageInfo) {
            throw new \Exception('El archivo no es una imagen válida');
        }

        // Validar dimensiones
        [$width, $height] = $imageInfo;
        if ($width > $maxWidth || $height > $maxHeight) {
            throw new \Exception("Las dimensiones de la imagen son demasiado grandes. Máximo permitido: {$maxWidth}x{$maxHeight}px. Dimensiones actuales: {$width}x{$height}px");
        }

        // Validar MIME type
        $allowedMimes = [
            'image/jpeg',
            'image/png', 
            'image/gif',
            'image/webp',
            'image/bmp'
        ];

        if (!in_array($imageInfo['mime'], $allowedMimes)) {
            throw new \Exception('Tipo MIME no permitido: ' . $imageInfo['mime']);
        }
    }

    /**
     * Format bytes to human readable format
     */
    private function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        
        $bytes /= (1 << (10 * $pow));
        
        return round($bytes, 2) . ' ' . $units[$pow];
    }
}
