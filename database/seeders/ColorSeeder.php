<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = [
            [
                'name' => 'Blanco',
                'hex' => '#ffffff',
            ],
            [
                'name' => 'Celeste',
                'hex' => '#bae6ed',
            ],
            [
                'name' => 'Rosa',
                'hex' => '#fecaca',
            ],
            [
                'name' => 'Naranja',
                'hex' => '#fed7aa',
            ],
            [
                'name' => 'Limón',
                'hex' => '#ecfccb',
            ],
        ];

        foreach ($colors as $color) {
            Color::updateOrCreate(['name' => $color['name']], $color);
        }
    }
}
