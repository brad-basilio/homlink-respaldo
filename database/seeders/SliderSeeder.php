<?php

namespace Database\Seeders;

use App\Models\Slider;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Slider::updateOrCreate([
            'name' => 'Net Coaching: Fusionando lo Mejor del Mundo Digital y el Desarrollo Humano para Potenciar tus Resultados al Máximo'
        ], [
            'description' => 'En Net Coaching, creamos un espacio donde la tecnología, la estrategia e innovación se encuentran. Nuestra plataforma digital te brinda acceso a los mejores coaches y mentores, mientras que el enfoque humano impulsa tu desarrollo y bienestar.',
            'primarybtn_text' => 'Busca tu Coach',
            'primarybtn_url' => '/coaches'
        ]);
    }
}
