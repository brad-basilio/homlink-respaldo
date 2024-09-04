<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqs = [
            [
                'id' => 'cf44223c-be07-4caf-9a29-3a23b114c64d',
                'question' => '¿Qué es Net Coaching?',
                'answer' => 'Net Coaching es una plataforma que ofrece programas de desarrollo personal y profesional mediante talleres, eventos y cursos en línea, enfocados en potenciar tus habilidades blandas y técnicas.',
            ],
            [
                'id' => 'cf44223c-be07-4caf-9a29-3a23b114c64e',
                'question' => '¿Cómo puedo inscribirme en un evento o taller?',
                'answer' => 'Para inscribirte en un evento o taller, simplemente visita nuestra página de eventos, selecciona el evento que te interesa y completa el formulario de inscripción.',
            ],
            [
                'id' => 'cf44223c-be07-4caf-9a29-3a23b114c64f',
                'question' => '¿Los programas de Net Coaching son en vivo o grabados?',
                'answer' => 'Ofrecemos una combinación de programas en vivo y grabados para adaptarnos a tus necesidades. Los talleres y eventos en vivo incluyen interacción en tiempo real con los coaches, mientras que los grabados te permiten aprender a tu propio ritmo.',
            ],
            [
                'id' => 'cf44223c-be07-4caf-9a29-3a23b114c64g',
                'question' => '¿Cuál es el costo de los cursos en Net Coaching?',
                'answer' => 'El costo de los cursos varía según el programa. Algunos eventos son gratuitos, mientras que otros tienen un costo que puede consultarse en la página del curso o evento específico.',
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::updateOrCreate(
                ['id' => $faq['id']],
                [
                    'name' => $faq['question'],
                    'description' => $faq['answer']
                ]
            );
        }
    }
}
