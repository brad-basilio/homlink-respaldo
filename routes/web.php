<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\OnepageController;
use App\Http\Controllers\LandingpageController;
use App\Http\Controllers\EcommercepageController;
use App\Http\Controllers\AplicativosController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\ProyectosController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\PostController;

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

// Route::get('/', function () {
//     return view('home');
// });

Route::get('/', [HomeController::class, 'viewHome'])->name('inicio');
Route::get('/servicios', [ServicesController::class, 'viewServices'])->name('servicios');
Route::get('/servicios/onepage', [OnepageController::class, 'viewOnepage'])->name('onepage');
Route::get('/servicios/landing', [LandingpageController::class, 'viewLandingpage'])->name('landingpage');
Route::get('/servicios/ecommerce', [EcommercepageController::class, 'viewEcommercepage'])->name('ecommercepage');
Route::get('/servicios/aplicativos', [AplicativosController::class, 'viewAplicativospage'])->name('aplicativospage');
Route::get('/contacto', [ContactoController::class, 'viewContacto'])->name('contacto');
Route::get('/proyectos', [ProyectosController::class, 'viewProyectos'])->name('proyectos');
Route::get('/blog', [PostController::class, 'index'])->name('posts.index');
Route::get('/blog/{post}', [PostController::class, 'show'])->name('posts.show');



Route::post('/contacto', [ContactoController::class, 'storeContacto'] )->name('guardarcontacto');
Route::post('/servicios/ecommerce', [FormController::class, 'store'] )->name('guardarpopup');
Route::post('/servicios/landing', [FormController::class, 'store2'] )->name('guardarpopup2');
Route::post('/servicios/onepage', [FormController::class, 'store3'] )->name('guardarpopup3');
Route::post('/servicios/aplicativos', [FormController::class, 'store4'] )->name('guardarpopup4');
Route::post('/', [FormController::class, 'store5'] )->name('formhome');

Route::get('/landingaplicativos', [LandingController::class, 'viewAplicativos'] )->name('landingaplicativos');
Route::get('/landingmundoweb', [LandingController::class, 'viewstoreLanding'] )->name('landingmundoweb');
Route::get('/landingecommerce', [LandingController::class, 'viewstoreEcommerce'] )->name('landingecommerce');
Route::get('/landingwebsite', [LandingController::class, 'viewstoreWebsite'] )->name('landingwebsite');
Route::get('/landingmundoweb-landing', [LandingController::class, 'viewLandingpagemundoweb'])->name('ultimalanding');

Route::post('/landingaplicativos/form', [LandingController::class, 'storeAplicativos'] )->name('guardarlandingaplicativos');
Route::post('/landingmundoweb/form', [LandingController::class, 'storeLanding'] )->name('guardarlandingmundoweb');
Route::post('/landingecommerce/form', [LandingController::class, 'storeEcommerce'] )->name('guardarlandingecommerce');
Route::post('/landingwebsite/form', [LandingController::class, 'storeWebsite'] )->name('guardarlandingwebsite');