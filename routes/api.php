<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Admin\AboutusController as AdminAboutusController;
use App\Http\Controllers\Admin\BenefitController as AdminBenefitController;
use App\Http\Controllers\Admin\CoachController as AdminCoachController;
use App\Http\Controllers\Admin\IndicatorController as AdminIndicatorController;
use App\Http\Controllers\Admin\ResourceController as AdminResourceController;
use App\Http\Controllers\Admin\SliderController as AdminSliderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Coach\ResourceController as CoachResourceController;
use App\Http\Controllers\CoverController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [AuthController::class, 'login']);
Route::post('signup', [AuthController::class, 'signup']);
Route::get('/sliders/media/{uuid}', [AdminSliderController::class, 'media']);
Route::get('/benefits/media/{uuid}', [AdminSliderController::class, 'media']);

Route::middleware('auth')->group(function () {
    Route::delete('logout', [AuthController::class, 'destroy'])
        ->name('logout');

    Route::get('/dashboard/{range}', [DashboardController::class, 'revenue']);

    Route::middleware('can:Admin')->prefix('admin')->group(function () {
        Route::post('/coaches/paginate', [AdminCoachController::class, 'paginate']);
        Route::patch('/coaches/status', [AdminCoachController::class, 'status']);

        Route::post('/resources/paginate', [AdminResourceController::class, 'paginate']);
        Route::patch('/resources/status', [AdminResourceController::class, 'status']);
        Route::delete('/resources/{id}', [AdminResourceController::class, 'delete']);

        Route::post('/aboutus', [AdminAboutusController::class, 'save']);
        Route::post('/aboutus/paginate', [AdminAboutusController::class, 'paginate']);
        Route::patch('/aboutus/status', [AdminAboutusController::class, 'status']);
        Route::patch('/aboutus/{field}', [AdminAboutusController::class, 'boolean']);
        Route::delete('/aboutus/{id}', [AdminAboutusController::class, 'delete']);

        Route::post('/indicators', [AdminIndicatorController::class, 'save']);
        Route::post('/indicators/paginate', [AdminIndicatorController::class, 'paginate']);
        Route::patch('/indicators/status', [AdminIndicatorController::class, 'status']);
        Route::patch('/indicators/{field}', [AdminIndicatorController::class, 'boolean']);
        Route::delete('/indicators/{id}', [AdminIndicatorController::class, 'delete']);

        Route::post('/benefits', [AdminBenefitController::class, 'save']);
        Route::post('/benefits/paginate', [AdminBenefitController::class, 'paginate']);
        Route::patch('/benefits/status', [AdminBenefitController::class, 'status']);
        Route::patch('/benefits/{field}', [AdminBenefitController::class, 'boolean']);
        Route::delete('/benefits/{id}', [AdminBenefitController::class, 'delete']);

        Route::post('/sliders', [AdminSliderController::class, 'save']);
        Route::post('/sliders/paginate', [AdminSliderController::class, 'paginate']);
        Route::patch('/sliders/status', [AdminSliderController::class, 'status']);
        Route::patch('/sliders/{field}', [AdminSliderController::class, 'boolean']);
        Route::delete('/sliders/{id}', [AdminSliderController::class, 'delete']);
    });

    Route::middleware('can:Coach')->prefix('coach')->group(function () {
        Route::post('/resources', [CoachResourceController::class, 'save']);
        Route::post('/resources/paginate', [CoachResourceController::class, 'paginate']);
        Route::patch('/resources/status', [CoachResourceController::class, 'status']);
        Route::delete('/resources/{id}', [CoachResourceController::class, 'delete']);
    });

    Route::get('/profile/{uuid}', [ProfileController::class, 'full']);
    Route::get('/profile/thumbnail/{uuid}', [ProfileController::class, 'thumbnail']);
    Route::post('/profile', [ProfileController::class, 'saveProfile']);
    Route::patch('/profile', [ProfileController::class, 'save']);

    Route::get('/cover/{uuid}', [CoverController::class, 'full']);
    Route::get('/cover/thumbnail/{uuid}', [CoverController::class, 'thumbnail']);
    Route::post('/cover', [CoverController::class, 'saveCover']);

    Route::patch('/account/email', [AccountController::class, 'email']);
    Route::patch('/account/password', [AccountController::class, 'password']);
});
