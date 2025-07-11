<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Exception;

class ImageHelper
{
    protected $imageManager;
    protected $maxFileSize;
    protected $maxWidth;
    protected $maxHeight;
    protected $quality;
    protected $allowedFormats;
    protected $convertToWebp;
    protected $webpQuality;

    public function __construct()
    {
        $this->imageManager = new ImageManager(new Driver());
        $this->maxFileSize = config('image.max_file_size', 5 * 1024 * 1024);
        $this->maxWidth = config('image.max_width', 2048);
        $this->maxHeight = config('image.max_height', 2048);
        $this->quality = config('image.quality', 85);
        $this->allowedFormats = config('image.formats', ['jpg', 'jpeg', 'png', 'gif', 'webp']);
        $this->convertToWebp = config('image.convert_to_webp', true);
        $this->webpQuality = config('image.webp_quality', 80);
    }

    /**
     * Validate and optimize uploaded image
     */
    public function processUploadedImage(UploadedFile $file, string $directory = 'images', array $options = [])
    {
        try {
            // Validate file
            $this->validateImage($file);

            // Process options
            $maxWidth = $options['max_width'] ?? $this->maxWidth;
            $maxHeight = $options['max_height'] ?? $this->maxHeight;
            $quality = $options['quality'] ?? $this->quality;
            $generateThumbnails = $options['thumbnails'] ?? false;
            $convertToWebp = $options['webp'] ?? $this->convertToWebp;

            // Load image
            $image = $this->imageManager->read($file->getPathname());

            // Auto-orient image (if supported)
            // $image->orientate(); // Commented out as this method might not exist in newer versions

            // Resize if needed
            if ($image->width() > $maxWidth || $image->height() > $maxHeight) {
                $image->resize($maxWidth, $maxHeight, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
            }

            // Generate filename
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = strtolower($file->getClientOriginalExtension());
            $filename = $this->generateUniqueFilename($originalName, $extension);

            // Save original/optimized image
            $path = $directory . '/' . $filename;
            $this->saveImage($image, $path, $extension, $quality);

            $result = [
                'path' => $path,
                'filename' => $filename,
                'size' => Storage::disk('public')->size($path),
                'dimensions' => [
                    'width' => $image->width(),
                    'height' => $image->height()
                ]
            ];

            // Generate WebP version if enabled
            if ($convertToWebp && $extension !== 'webp') {
                $webpPath = $directory . '/' . pathinfo($filename, PATHINFO_FILENAME) . '.webp';
                $this->saveImage($image, $webpPath, 'webp', $this->webpQuality);
                $result['webp_path'] = $webpPath;
            }

            // Generate thumbnails if requested
            if ($generateThumbnails) {
                $result['thumbnails'] = $this->generateThumbnails($image, $directory, pathinfo($filename, PATHINFO_FILENAME));
            }

            return $result;

        } catch (Exception $e) {
            throw new Exception('Error processing image: ' . $e->getMessage());
        }
    }

    /**
     * Validate uploaded image
     */
    protected function validateImage(UploadedFile $file)
    {
        // Check file size
        if ($file->getSize() > $this->maxFileSize) {
            throw new Exception('El archivo es demasiado grande. Tamaño máximo permitido: ' . $this->formatBytes($this->maxFileSize));
        }

        // Check file type
        $extension = strtolower($file->getClientOriginalExtension());
        if (!in_array($extension, $this->allowedFormats)) {
            throw new Exception('Formato de archivo no permitido. Formatos permitidos: ' . implode(', ', $this->allowedFormats));
        }

        // Check if it's actually an image
        if (!getimagesize($file->getPathname())) {
            throw new Exception('El archivo no es una imagen válida.');
        }
    }

    /**
     * Save image to storage
     */
    protected function saveImage($image, string $path, string $format, int $quality)
    {
        $encodedImage = match(strtolower($format)) {
            'jpg', 'jpeg' => $image->toJpeg($quality),
            'png' => $image->toPng(),
            'gif' => $image->toGif(),
            'webp' => $image->toWebp($quality),
            'bmp' => $image->toBmp(),
            default => $image->toJpeg($quality)
        };

        Storage::disk('public')->put($path, $encodedImage);
    }

    /**
     * Generate thumbnails
     */
    protected function generateThumbnails($image, string $directory, string $baseName)
    {
        $thumbnails = [];
        $thumbnailSizes = config('image.thumbnails', []);

        foreach ($thumbnailSizes as $size => $dimensions) {
            $thumbnail = clone $image;
            $thumbnail->resize($dimensions['width'], $dimensions['height'], function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            $thumbnailPath = $directory . '/thumbnails/' . $baseName . '_' . $size . '.webp';
            $this->saveImage($thumbnail, $thumbnailPath, 'webp', $this->webpQuality);
            
            $thumbnails[$size] = $thumbnailPath;
        }

        return $thumbnails;
    }

    /**
     * Generate unique filename
     */
    protected function generateUniqueFilename(string $originalName, string $extension): string
    {
        $safeName = Str::slug($originalName);
        $timestamp = time();
        $random = Str::random(6);
        
        return $safeName . '_' . $timestamp . '_' . $random . '.' . $extension;
    }

    /**
     * Format bytes to human readable format
     */
    protected function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        
        $bytes /= (1 << (10 * $pow));
        
        return round($bytes, 2) . ' ' . $units[$pow];
    }

    /**
     * Delete image and its variants
     */
    public function deleteImage(string $path): bool
    {
        try {
            // Delete main image
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }

            // Delete WebP version
            $webpPath = pathinfo($path, PATHINFO_DIRNAME) . '/' . pathinfo($path, PATHINFO_FILENAME) . '.webp';
            if (Storage::disk('public')->exists($webpPath)) {
                Storage::disk('public')->delete($webpPath);
            }

            // Delete thumbnails
            $baseName = pathinfo($path, PATHINFO_FILENAME);
            $directory = pathinfo($path, PATHINFO_DIRNAME);
            $thumbnailDir = $directory . '/thumbnails/';

            $thumbnailSizes = array_keys(config('image.thumbnails', []));
            foreach ($thumbnailSizes as $size) {
                $thumbnailPath = $thumbnailDir . $baseName . '_' . $size . '.webp';
                if (Storage::disk('public')->exists($thumbnailPath)) {
                    Storage::disk('public')->delete($thumbnailPath);
                }
            }

            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    /**
     * Get image info
     */
    public function getImageInfo(string $path): ?array
    {
        try {
            if (!Storage::disk('public')->exists($path)) {
                return null;
            }

            $fullPath = storage_path('app/public/' . $path);
            $imageSize = getimagesize($fullPath);
            
            return [
                'path' => $path,
                'size' => Storage::disk('public')->size($path),
                'dimensions' => [
                    'width' => $imageSize[0],
                    'height' => $imageSize[1]
                ],
                'mime_type' => $imageSize['mime'],
                'url' => asset('storage/' . $path)
            ];
        } catch (Exception $e) {
            return null;
        }
    }

    /**
     * Resize existing image
     */
    public function resizeExistingImage(string $path, int $width, int $height, string $newPath = null): string
    {
        try {
            if (!Storage::disk('public')->exists($path)) {
                throw new Exception('Image not found');
            }

            $fullPath = storage_path('app/public/' . $path);
            $image = $this->imageManager->read($fullPath);
            
            $image->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            $outputPath = $newPath ?? $path;
            $extension = pathinfo($outputPath, PATHINFO_EXTENSION);
            $this->saveImage($image, $outputPath, $extension, $this->quality);

            return $outputPath;
        } catch (Exception $e) {
            throw new Exception('Error resizing image: ' . $e->getMessage());
        }
    }
}
