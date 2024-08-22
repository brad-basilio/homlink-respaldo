<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Coach\HomeController as CoachHomeController;
use App\Http\Controllers\Coach\ProfileController as CoachProfileController;
use App\Http\Controllers\CoachController;
use App\Http\Controllers\Coach\ResourceController as CoachResourceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UsersByServicesByBusinessController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [HomeController::class, 'reactView'])->name('Home.jsx');
Route::get('/profile/{coach}', [CoachController::class, 'reactView'])->name('Profile.jsx');
Route::get('/login', [AuthController::class, 'loginView'])->name('Login.jsx');
Route::get('/register', [AuthController::class, 'registerView'])->name('Register.jsx');
Route::get('/confirm-email/{token}', [AuthController::class, 'confirmEmailView'])->name('ConfirmEmail.jsx');

Route::get('/confirmation/{token}', [AuthController::class, 'loginView']);
Route::get('/invitation/{token}', [UsersByServicesByBusinessController::class, 'acceptInvitation']);




Route::middleware(['can:Coach', 'auth'])->prefix('coach')->group(function () {
    Route::get('/home', [CoachHomeController::class, 'reactView'])->name('Coach/Home.jsx');
    Route::get('/resources', [CoachResourceController::class, 'reactView'])->name('Coach/Resources.jsx');

    // Route::get('/coaches', [CoachController::class, 'reactView'])->name('Coach/Home.jsx');
    // Route::get('/businesses', [BusinessController::class, 'reactView'])->name('Businesses.jsx');
    // Route::get('/services', [ServiceController::class, 'reactView'])->name('Services.jsx');

    Route::get('/profile', [CoachProfileController::class, 'reactView'])->name('Coach/Profile.jsx');
});
