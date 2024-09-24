<?php

namespace Database\Seeders;

use App\Models\Aboutus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AboutusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $aboutuses = [
            [
                'name' => 'Somos',
                'description' => 'Somos Trasciende,... Sed commodo turpis et lorem fermentum, pulvinar laoreet arcu condimentum. *Nam pharetra, magna a sollicitudin dictum*, urna felis euismod nulla, sit amet rhoncus sapien enim in lectus. Fusce tristique a nunc vel dapibus. In hac habitasse platea dictumst.',
            ],
            [
                'name' => 'Resúmen',
                'description' => 'En Transciende, te guiamos en el camino hacia el crecimiento personal y profesional. Nuestro enfoque en el desarrollo integral te permitirá alcanzar tus metas, superar tus límites y transformar tu vida en la mejor versión de ti mismo.',
            ],
            [
                'name' => 'Historia',
                'description' => 'Trasciende nació hace diez años con la misión de ayudar a las personas a descubrir su máximo potencial. Un pequeño grupo de profesionales creó programas de coaching enfocados en el desarrollo personal y profesional, integrando habilidades técnicas y autoconocimiento para transformar vidas.\nHoy, Trasciende es un referente en crecimiento integral, habiendo impactado a miles de personas a través de sus cursos y talleres. Su enfoque sigue siendo ayudar a cada individuo a alcanzar su mejor versión, expandiéndose a plataformas digitales para llegar a un público global.',
            ],
            [
                'name' => 'Fortaleza',
                'description' => 'En Trasciende, estamos comprometidos en inspirar hábitos saludables tanto física como mentalmente, empoderando a las personas para que adopten prácticas que mejoren su bienestar. Creemos que pequeños cambios consistentes pueden llevar a grandes transformaciones, y nos enfocamos en brindar las herramientas necesarias para fomentar el crecimiento y la resiliencia en cada etapa de la vida.'
            ],
            [
                'name' => 'Misión',
                'description' => 'Duis aute irure dolor in reprehenderit'
            ],
            [
                'name' => 'Visión',
                'description' => 'Duis aute irure dolor in reprehenderit'
            ]
        ];

        foreach ($aboutuses as $aboutus) {
            Aboutus::updateOrCreate(['name' => $aboutus['name']], [
                'description' => $aboutus['description']
            ]);
        }
    }
}
