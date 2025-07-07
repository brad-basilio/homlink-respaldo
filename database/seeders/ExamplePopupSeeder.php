<?php

namespace Database\Seeders;

use App\Models\Ad;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExamplePopupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Popup de ejemplo: Feriado del 7 de julio
        Ad::create([
            'name' => '🎉 ¡Hoy 7 de Julio es Feriado!',
            'description' => 'Disfruta de este día especial. Nuestras oficinas están cerradas pero nuestro servicio de cambio de divisas online sigue disponible 24/7. ¡Aprovecha nuestras tasas preferenciales!',
            'image' => null, // Puedes agregar una imagen después
            'link' => 'https://mi.cambiafx.pe',
            'seconds' => 0, // Se muestra inmediatamente
            'date_begin' => Carbon::today()->format('Y-m-d'),
            'date_end' => Carbon::today()->format('Y-m-d'),
            'invasivo' => true, // Es invasivo porque es un anuncio importante
            'actions' => 0, // Se muestra al cargar la página
            'item_id' => null,
            'visible' => true,
            'status' => true,
        ]);

        // Popup de ejemplo: Promoción con delay
        Ad::create([
            'name' => '💰 ¡Oferta Especial!',
            'description' => 'Obtén las mejores tasas de cambio con nuestro cupón FELIZ28. Válido por tiempo limitado.',
            'image' => null,
            'link' => null,
            'seconds' => 10, // Se muestra después de 10 segundos
            'date_begin' => Carbon::today()->format('Y-m-d'),
            'date_end' => Carbon::today()->addDays(7)->format('Y-m-d'),
            'invasivo' => false,
            'actions' => 0,
            'item_id' => null,
            'visible' => true,
            'status' => true,
        ]);

        // Popup de ejemplo: Información permanente
        Ad::create([
            'name' => '🏦 Registrados en la SBS',
            'description' => 'Somos una casa de cambio autorizada y supervisada por la Superintendencia de Banca, Seguros y AFP. Tu dinero está seguro con nosotros.',
            'image' => null,
            'link' => 'https://cambiafx.pe/sobre-nosotros',
            'seconds' => 30, // Se muestra después de 30 segundos
            'date_begin' => null, // Sin fecha límite
            'date_end' => null,
            'invasivo' => false,
            'actions' => 0,
            'item_id' => null,
            'visible' => true,
            'status' => true,
        ]);
    }
}
