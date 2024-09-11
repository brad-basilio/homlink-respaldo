<?php

use Illuminate\Support\Facades\Route;

// Admin
use App\Http\Controllers\Admin\AboutusController as AdminAboutusController;
use App\Http\Controllers\Admin\BenefitController as AdminBenefitController;
use App\Http\Controllers\Admin\CoachController as AdminCoachController;
use App\Http\Controllers\Admin\EventController as AdminEventController;
use App\Http\Controllers\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\Admin\HomeController as AdminHomeController;
use App\Http\Controllers\Admin\IndicatorController as AdminIndicatorController;
use App\Http\Controllers\Admin\ResourceController as AdminResourceController;
use App\Http\Controllers\Admin\SliderController as AdminSliderController;
use App\Http\Controllers\Admin\TestimonyController as AdminTestimonyController;
use App\Http\Controllers\Admin\SubscriptionController as AdminSubscriptionController;

// Coach
use App\Http\Controllers\Coach\HomeController as CoachHomeController;
use App\Http\Controllers\Coach\ProfileController as CoachProfileController;
use App\Http\Controllers\Coach\ResourceController as CoachResourceController;

// Public 
use App\Http\Controllers\CoachController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AboutusController;
use App\Http\Controllers\Coachee\HomeController as CoacheeHomeController;

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
Route::get('/resources', [ResourceController::class, 'reactView'])->name('Resources.jsx');
Route::get('/resources/{resourceId}', [ResourceController::class, 'get'])->name('ResourceDetails.jsx');
Route::get('/about', [AboutusController::class, 'reactView'])->name('About.jsx');
Route::get('/coaches', [CoachController::class, 'reactView'])->name('Coaches.jsx');
Route::get('/events', [EventController::class, 'reactView'])->name('Events.jsx');

Route::get('/profile/{coach}', [ProfileController::class, 'reactView'])->name('Profile.jsx');
Route::get('/login', [AuthController::class, 'loginView'])->name('Login.jsx');
Route::get('/register', [AuthController::class, 'registerView'])->name('Register.jsx');
Route::get('/confirm-email/{token}', [AuthController::class, 'confirmEmailView'])->name('ConfirmEmail.jsx');

Route::get('/confirmation/{token}', [AuthController::class, 'loginView']);
// Route::get('/invitation/{token}', [UsersByServicesByBusinessController::class, 'acceptInvitation']);



Route::middleware(['can:Coachee', 'auth'])->prefix('coachee')->group(function () {
    Route::get('/home', [CoacheeHomeController::class, 'reactView'])->name('Coachee/Home.jsx');
});

Route::middleware(['can:Coach', 'auth'])->prefix('coach')->group(function () {
    Route::get('/home', [CoachHomeController::class, 'reactView'])->name('Coach/Home.jsx');
    Route::get('/resources', [CoachResourceController::class, 'reactView'])->name('Coach/Resources.jsx');

    // Route::get('/coaches', [CoachController::class, 'reactView'])->name('Coach/Home.jsx');
    // Route::get('/businesses', [BusinessController::class, 'reactView'])->name('Businesses.jsx');
    // Route::get('/services', [ServiceController::class, 'reactView'])->name('Services.jsx');

    Route::get('/profile', [CoachProfileController::class, 'reactView'])->name('Coach/Profile.jsx');
});

Route::middleware(['can:Admin', 'auth'])->prefix('admin')->group(function () {
    Route::get('/home', [AdminHomeController::class, 'reactView'])->name('Admin/Home.jsx');
    Route::get('/coaches', [AdminCoachController::class, 'reactView'])->name('Admin/Coaches.jsx');
    Route::get('/resources', [AdminResourceController::class, 'reactView'])->name('Admin/Resources.jsx');
    Route::get('/messages', [AdminSubscriptionController::class, 'reactView'])->name('Admin/Messages.jsx');
    Route::get('/subscriptions', [AdminSubscriptionController::class, 'reactView'])->name('Admin/Subscriptions.jsx');

    Route::get('/about', [AdminAboutusController::class, 'reactView'])->name('Admin/About.jsx');
    Route::get('/indicators', [AdminIndicatorController::class, 'reactView'])->name('Admin/Indicators.jsx');
    Route::get('/sliders', [AdminSliderController::class, 'reactView'])->name('Admin/Sliders.jsx');
    Route::get('/benefits', [AdminBenefitController::class, 'reactView'])->name('Admin/Benefits.jsx');
    Route::get('/testimonies', [AdminTestimonyController::class, 'reactView'])->name('Admin/Testimonies.jsx');
    Route::get('/events', [AdminEventController::class, 'reactView'])->name('Admin/Events.jsx');
    Route::get('/faqs', [AdminFaqController::class, 'reactView'])->name('Admin/Faqs.jsx');

    Route::get('/profile', [CoachProfileController::class, 'reactView'])->name('Admin/Profile.jsx');
});
