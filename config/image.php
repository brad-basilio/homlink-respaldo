<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Image Driver
    |--------------------------------------------------------------------------
    |
    | Intervention Image supports "GD Library" and "Imagick" to process images
    | internally. Depending on your PHP setup, you can choose one of them.
    |
    | Included options:
    |   - \Intervention\Image\Drivers\Gd\Driver::class
    |   - \Intervention\Image\Drivers\Imagick\Driver::class
    |
    */

    'driver' => \Intervention\Image\Drivers\Gd\Driver::class,

    /*
    |--------------------------------------------------------------------------
    | Configuration Options
    |--------------------------------------------------------------------------
    |
    | These options control the behavior of image processing
    |
    */

    'options' => [
        'autoOrient' => true,
        'decodeOptions' => [
            'limitMemory' => true,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Image Processing Settings
    |--------------------------------------------------------------------------
    |
    | Default settings for image optimization
    |
    */

    'max_file_size' => 5 * 1024 * 1024, // 5MB
    'max_width' => 2048,
    'max_height' => 2048,
    'quality' => 85,
    'formats' => ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'],

    /*
    |--------------------------------------------------------------------------
    | Thumbnail Settings
    |--------------------------------------------------------------------------
    |
    | Settings for generating thumbnails
    |
    */

    'thumbnails' => [
        'small' => ['width' => 150, 'height' => 150],
        'medium' => ['width' => 300, 'height' => 300],
        'large' => ['width' => 600, 'height' => 600],
    ],

    /*
    |--------------------------------------------------------------------------
    | WebP Conversion
    |--------------------------------------------------------------------------
    |
    | Enable automatic WebP conversion for better performance
    |
    */

    'convert_to_webp' => true,
    'webp_quality' => 80,
];
