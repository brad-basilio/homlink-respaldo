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

Route::post('/contacto', [ContactoController::class, 'storeContacto'] )->name('guardarcontacto');