<?php

namespace App\Services;

use App\Helpers\ImageHelper;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Exception;

class ImageService
{
    protected $imageHelper;

    public function __construct(ImageHelper $imageHelper)
    {
        $this->imageHelper = $imageHelper;
    }

    /**
     * Process and store uploaded image
     */
    public function storeImage(UploadedFile $file, string $directory = 'uploads', array $options = []): array
    {
        try {
            Log::info('Processing image upload', [
                'original_name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'directory' => $directory
            ]);

            $result = $this->imageHelper->processUploadedImage($file, $directory, $options);

            Log::info('Image processed successfully', [
                'path' => $result['path'],
                'final_size' => $result['size'],
                'dimensions' => $result['dimensions']
            ]);

            return [
                'success' => true,
                'data' => $result,
                'message' => 'Imagen procesada correctamente'
            ];

        } catch (Exception $e) {
            Log::error('Error processing image', [
                'error' => $e->getMessage(),
                'file' => $file->getClientOriginalName()
            ]);

            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Store image for specific model types
     */
    public function storeModelImage(UploadedFile $file, string $modelType, array $options = []): array
    {
        $modelConfigs = [
            'banner' => [
                'directory' => 'banners',
                'max_width' => 1920,
                'max_height' => 1080,
                'quality' => 90,
                'thumbnails' => true,
                'webp' => true
            ],
            'slider' => [
                'directory' => 'sliders',
                'max_width' => 1920,
                'max_height' => 1080,
                'quality' => 85,
                'thumbnails' => true,
                'webp' => true
            ],
            'product' => [
                'directory' => 'products',
                'max_width' => 800,
                'max_height' => 800,
                'quality' => 85,
                'thumbnails' => true,
                'webp' => true
            ],
            'avatar' => [
                'directory' => 'avatars',
                'max_width' => 400,
                'max_height' => 400,
                'quality' => 80,
                'thumbnails' => true,
                'webp' => true
            ],
            'post' => [
                'directory' => 'posts',
                'max_width' => 1200,
                'max_height' => 800,
                'quality' => 85,
                'thumbnails' => true,
                'webp' => true
            ],
            'logo' => [
                'directory' => 'logos',
                'max_width' => 500,
                'max_height' => 500,
                'quality' => 90,
                'thumbnails' => false,
                'webp' => true
            ]
        ];

        $config = $modelConfigs[$modelType] ?? $modelConfigs['product'];
        $finalOptions = array_merge($config, $options);

        return $this->storeImage($file, $finalOptions['directory'], $finalOptions);
    }

    /**
     * Update existing image
     */
    public function updateImage(UploadedFile $file, ?string $oldImagePath, string $directory = 'uploads', array $options = []): array
    {
        try {
            // Delete old image if exists
            if ($oldImagePath) {
                $this->deleteImage($oldImagePath);
            }

            // Store new image
            return $this->storeImage($file, $directory, $options);

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Delete image and its variants
     */
    public function deleteImage(string $path): bool
    {
        try {
            return $this->imageHelper->deleteImage($path);
        } catch (Exception $e) {
            Log::error('Error deleting image', [
                'path' => $path,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Get image information
     */
    public function getImageInfo(string $path): ?array
    {
        return $this->imageHelper->getImageInfo($path);
    }

    /**
     * Resize existing image
     */
    public function resizeImage(string $path, int $width, int $height, string $newPath = null): array
    {
        try {
            $result = $this->imageHelper->resizeExistingImage($path, $width, $height, $newPath);
            
            return [
                'success' => true,
                'path' => $result,
                'message' => 'Imagen redimensionada correctamente'
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Generate responsive image URLs
     */
    public function getResponsiveUrls(string $basePath): array
    {
        $info = $this->getImageInfo($basePath);
        if (!$info) {
            return [];
        }

        $urls = [
            'original' => asset('storage/' . $basePath)
        ];

        // Add WebP version if exists
        $webpPath = pathinfo($basePath, PATHINFO_DIRNAME) . '/' . pathinfo($basePath, PATHINFO_FILENAME) . '.webp';
        if (file_exists(storage_path('app/public/' . $webpPath))) {
            $urls['webp'] = asset('storage/' . $webpPath);
        }

        // Add thumbnails if exist
        $baseName = pathinfo($basePath, PATHINFO_FILENAME);
        $directory = pathinfo($basePath, PATHINFO_DIRNAME);
        $thumbnailSizes = config('image.thumbnails', []);

        foreach ($thumbnailSizes as $size => $dimensions) {
            $thumbnailPath = $directory . '/thumbnails/' . $baseName . '_' . $size . '.webp';
            if (file_exists(storage_path('app/public/' . $thumbnailPath))) {
                $urls['thumbnail_' . $size] = asset('storage/' . $thumbnailPath);
            }
        }

        return $urls;
    }

    /**
     * Bulk process images
     */
    public function bulkProcessImages(array $files, string $directory = 'uploads', array $options = []): array
    {
        $results = [];
        $successCount = 0;
        $errorCount = 0;

        foreach ($files as $index => $file) {
            if ($file instanceof UploadedFile) {
                $result = $this->storeImage($file, $directory, $options);
                $results[$index] = $result;

                if ($result['success']) {
                    $successCount++;
                } else {
                    $errorCount++;
                }
            }
        }

        return [
            'results' => $results,
            'summary' => [
                'total' => count($files),
                'success' => $successCount,
                'errors' => $errorCount
            ]
        ];
    }
}
