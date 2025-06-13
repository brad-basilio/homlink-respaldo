<?php

namespace App\Providers;

use App\Models\Sale;
use App\Models\User;
use App\Observers\SaleCreationObserver;
use App\Observers\SaleStatusObserver;
use App\Observers\UserNameObserver;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Configure database to disconnect idle connections
        DB::disconnect();
        
        // Add event listener to close connections after request is processed
        app()->terminating(function () {
            DB::disconnect();
        });

        Sale::observe([
            SaleCreationObserver::class,
            SaleStatusObserver::class,
        ]);
        User::observe(UserNameObserver::class);
    }
}
