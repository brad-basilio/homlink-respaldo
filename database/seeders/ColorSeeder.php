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
        $colors = ['Amarillo', 'Blanco', 'Celeste', 'Lila', 'Naranja', 'Rosado', 'Verde'];

        foreach ($items as $item) {
            foreach ($colors as $color) {
                Color::updateOrCreate([
                    'item_id' => $item->id,
                    'name' => $color
                ], [
                    'image' => strtolower($color) . ".png"
                ]);
            }
        }
    }
}
