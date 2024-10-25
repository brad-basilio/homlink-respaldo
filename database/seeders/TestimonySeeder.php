<?php

namespace Database\Seeders;

use App\Models\Testimony;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestimonySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonies = [
            [
                'description' => 'Este champú ha transformado por completo mi cabello, ahora se ve más saludable y brillante.',
                'name' => 'María López',
                'correlative' => 'maria_healthyhair'
            ],
            [
                'description' => 'Llevo usando este champú por un mes y el crecimiento de mi cabello es increíble. ¡Lo recomiendo 100%!',
                'name' => 'Carlos Ramírez',
                'correlative' => 'carlos_hairgrowth'
            ],
            [
                'description' => 'He probado muchos productos, pero este champú es el único que realmente combate la caspa y deja mi cuero cabelludo limpio.',
                'name' => 'Ana Torres',
                'correlative' => 'ana_anticaspa'
            ],
            [
                'description' => 'Mi cabello solía estar seco y sin vida, pero este champú lo ha revitalizado completamente.',
                'name' => 'Lucía Fernández',
                'correlative' => 'lucia_haircare'
            ],
            [
                'description' => 'El aroma de este champú es increíble y me deja el cabello suave y manejable todo el día.',
                'name' => 'Diego Pérez',
                'correlative' => 'diego_softshine'
            ],
            [
                'description' => 'Este champú ha sido una salvación para mi cabello teñido, mantiene el color vibrante por más tiempo.',
                'name' => 'Sofía García',
                'correlative' => 'sofia_colortreated'
            ]
        ];

        foreach ($testimonies as $testimony) {
            Testimony::updateOrCreate(
                ['name' => $testimony['name']],
                $testimony
            );
        }
    }
}
