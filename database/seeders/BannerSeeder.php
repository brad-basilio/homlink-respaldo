<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Banner::create([
            'name' => 'Banner Principal de Inicio',
            'description' => 'Banner principal que se muestra en la página de inicio',
            'image' => 'banner-home-1.jpg',
            'button_text' => 'Conoce más',
            'button_link' => '/nosotros',
            'section' => 'home',
            'position' => 'header',
            'order' => 1,
            'status' => true,
            'visible' => true
        ]);

        Banner::create([
            'name' => 'Banner Secundario Home',
            'description' => 'Banner secundario en la sección principal de inicio',
            'image' => 'banner-home-2.jpg',
            'button_text' => 'Ver servicios',
            'button_link' => '/servicios',
            'section' => 'home',
            'position' => 'main',
            'order' => 1,
            'status' => true,
            'visible' => true
        ]);

        Banner::create([
            'name' => 'Banner Slider 1',
            'description' => 'Primer banner del slider de la página 2',
            'image' => 'banner-slider-1.jpg',
            'button_text' => 'Explorar',
            'button_link' => '/productos',
            'section' => 'home',
            'position' => 'slider',
            'order' => 1,
            'status' => true,
            'visible' => true
        ]);

        Banner::create([
            'name' => 'Banner Slider 2',
            'description' => 'Segundo banner del slider de la página 2',
            'image' => 'banner-slider-2.jpg',
            'button_text' => 'Contactar',
            'button_link' => '/contacto',
            'section' => 'home',
            'position' => 'slider',
            'order' => 2,
            'status' => true,
            'visible' => true
        ]);

        Banner::create([
            'name' => 'Banner de Productos',
            'description' => 'Banner principal de la sección de productos',
            'image' => 'banner-productos.jpg',
            'button_text' => 'Ver catálogo',
            'button_link' => '/catalogo',
            'section' => 'productos',
            'position' => 'header',
            'order' => 1,
            'status' => true,
            'visible' => true
        ]);
    }
}
