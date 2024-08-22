<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\Coach\ResourceController as CoachResourceController;
use App\Http\Controllers\CoachController;
use App\Http\Controllers\CoverController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingFormController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RemainingHistoryController;
use App\Http\Controllers\ServicesByBusinessController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\UserByProjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UsersByServicesByBusinessController;
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

Route::middleware('auth')->group(function () {
    Route::delete('logout', [AuthController::class, 'destroy'])
        ->name('logout');

    Route::get('/dashboard/{range}', [DashboardController::class, 'revenue']);

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
