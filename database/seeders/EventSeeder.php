<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'id' => 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
                'name' => '2021: ¿Cómo volver a empezar?',
                'description' => 'Únete a nuestro taller exclusivo donde expertos en liderazgo comparten sus conocimientos para ayudarte a convertirte en un líder efectivo y completo.',
                'type' => 'Talleres',
            ],
            [
                'id' => 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
                'name' => 'Webinario de Habilidades Blandas',
                'description' => 'Descubre cómo desarrollar y aplicar habilidades blandas para avanzar en tu carrera y vida personal en este evento virtual informativo.',
                'type' => 'Eventos',
            ],
            [
                'id' => 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
                'name' => 'Programa de Desarrollo Profesional',
                'description' => 'Participa en nuestro programa de varios días diseñado para equiparte con las habilidades y el conocimiento necesarios para alcanzar el éxito en tu carrera.',
                'type' => 'Talleres',
            ],
            [
                'id' => 'f47ac10b-58cc-4372-a567-0e02b2c3d482',
                'name' => 'Curso Intensivo de Innovación',
                'description' => 'Inscríbete en nuestro curso intensivo de innovación, donde aprenderás las últimas tendencias y técnicas para impulsar el cambio en tu empresa y carrera.',
                'type' => 'Cursos',
            ]
        ];

        foreach ($events as $event) {
            Event::updateOrCreate(
                ['id' => $event['id']],
                [
                    'name' => $event['name'],
                    'description' => $event['description'],
                    'type' => $event['type'],
                    'date_time' => '2024-10-11 12:00:00'
                ]
            );
        }
    }
}
