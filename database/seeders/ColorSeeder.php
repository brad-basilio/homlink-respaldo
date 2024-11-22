<?php

namespace Database\Seeders;

use App\Models\Color;
use App\Models\Item;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use SoDe\Extend\Text;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = Item::select('id')
            ->where('featured', true)
            ->get();
        $colors = [
            [
                'name' => 'Amarillo',
                'hex' => '#FFD700'
            ],
            [
                'name' => 'Blanco',
                'hex' => '#FFFFFF'
            ],
            [
                'name' => 'Celeste',
                'hex' => '#00FFFF'
            ],
            [
                'name' => 'Lila',
                'hex' => '#800080'
            ],
            [
                'name' => 'Naranja',
                'hex' => '#FFA500'
            ],
            [
                'name' => 'Rosado',
                'hex' => '#FFC0CB'
            ],
            [
                'name' => 'Verde',
                'hex' => '#00FF00'
            ]
        ];

        foreach ($items as $item) {
            foreach ($colors as $color) {
                Color::updateOrCreate([
                    'item_id' => $item->id,
                    'name' => $color['name']
                ], [
                    'image' => strtolower($color['name']) . ".png",
                    'hex' => $color['hex']
                ]);
            }
        }
    }
}
