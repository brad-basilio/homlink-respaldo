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
                'name' => '¿Qué productos ofrecen?',
                'description' => 'Nosotr@s creamos desde la alquimia Shampoos y Acondicionadores 100% personalizados, sin parabenos, sulfatos, ni sales, libres de crueldad animal, veganos y con ingredientes orgánicos en su estado más puro. Queremos que logres la mejor versión de tu cabello desde la primera lavada.'
            ],
            [
                'name' => '¿Cuáles son los métodos de pago?',
                'description' => 'Nuestros métodos de pago son mediante tarjetas de crédito y débito.'
            ],
            [
                'name' => '¿Puedo crear mi Shampoo & Acondicionador si tengo dermatitis, alopecia u otra condición dermatológica?',
                'description' => 'En el caso de padecer alopecia moderada, recomendamos que entre los objetivos se escoja el fortalecimiento y anticaida. Si el problema es por dermatitis, aconsejamos una fórmula sin fragancia y sin color, para evitar posibles alteraciones o alergias. Nuestros productos están especializados en salud y belleza capilar, si el cuadro de alopecia, dermatitis u otra condición es severa, es necesario visitar a un especialista o dermatólogo.'
            ],
            [
                'name' => '¿Desde que edad se puede usar Vuá?',
                'description' => 'Nuestros Shampoos y Acondicionadores pueden ser utilizados desde los 10 años de edad.'
            ],
            [
                'name' => '¿Cuánto tiempo demora la creación de cada Shampoo y Acondicionador?',
                'description' => 'Este proceso demora de 3 a 6 días útiles, después de llenar el formulario de análisis en nuestra web para conocer más sobre tu pelo y sus necesidades, nuestro grupo de especialistas escogen los mejores ingredientes.'
            ],
            [
                'name' => '¿Cuál es la cantidad de cada frasco/botella?',
                'description' => 'Cada frasco de Acondicionador o Shampoo tiene una cantidad de 400ml'
            ],
            [
                'name' => '¿Cuánto dura aproximadamente cada uno?',
                'description' => 'Cada frasco de vuá te puede durar de 7 a 9 semanas según el largo y volumen de tu cabello'
            ],
            [
                'name' => '¿Sus productos funcionan para cualquier tipo de pelo?',
                'description' => '¡Totalmente! al ser un producto 100% personalizado cubre todas las necesidades de tu pelo de manera individual, además nuestra fórmula vegana, libre de parabenos, sales, sulfatos y con ingredientes orgánicos es segura y efectiva.'
            ],
            [
                'name' => '¿Las botellas se pueden recargar?',
                'description' => 'Por el momento no tenemos la opción de refill en nuestras botellas, sin embargo estamos trabajando aspectos logísticos y más para incorporarlo lo antes posible.'
            ],
            [
                'name' => '¿Cómo se usa el shampoo y acondicionador?',
                'description' => 'El Shampoo se debe aplicar solo en cuero cabelludo, con masajes circulares con las yemas de los dedos y en cantidad moderada. El uso del acondicionador debe ser de medios a puntas o lo más alejado posible del cuero cabelludo, dejar actuar de 3 a 5 minutos y luego se debe enjuagar bien.'
            ],
            [
                'name' => '¿Se pueden personalizar las fragancias?',
                'description' => 'Claro, tenemos fragancias exclusivas para todos los gustos, están conformadas por los mejores aromas de frutas, verduras y plantas'
            ],
            [
                'name' => '¿Usan siliconas en Shampoos y Acondicionadores?',
                'description' => 'Los shampoos y los acondicionadores de Vuá solo tienen siliconas hidrosolubles para un mejor desenredo y una mejor suavidad, así mismo en el shampoo se usa una silicona específica para aumentar la espuma al momento del lavado.'
            ],
            [
                'name' => '¿Qué colorantes usan?',
                'description' => 'Los colorantes que se usan son de grado alimenticio y aprobados por la Agencia Federal de Medicamentos y Alimentos (Food and Drug Administration: FDA) de EEUU y Europa.'
            ],
            [
                'name' => '¿Las botellas son reciclables?',
                'description' => 'Nuestros envases son de resina termoplástica tipo 1, lo cual garantiza la opción de reciclaje tanto en nuestras botellas como aplicadores. Se pueden reutilizar para diferentes productos líquidos con previa limpieza.'
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::updateOrCreate(['name' => $faq['name']], $faq);
        }
    }
}
