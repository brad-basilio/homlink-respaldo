<?php

require_once 'vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\PropertySubmissionController;
use Illuminate\Support\Facades\Schema;

// Bootstrap Laravel
$app = new Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

// Register essential service providers
$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

// Start the application
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

// Check database connection and properties table structure
try {
    echo "Checking database connection...\n";
    
    // Load Laravel config
    $configLoader = new \Illuminate\Foundation\Bootstrap\LoadConfiguration();
    $configLoader->bootstrap($app);
    
    // Load environment
    $envLoader = new \Illuminate\Foundation\Bootstrap\LoadEnvironmentVariables();
    $envLoader->bootstrap($app);
    
    // Register configs
    $app->register(\Illuminate\Database\DatabaseServiceProvider::class);
    
    echo "Columns in properties table:\n";
    $columns = Schema::getColumnListing('properties');
    foreach($columns as $column) {
        echo "- $column\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
