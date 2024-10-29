<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'name' => 'Shampoo',
                'description' => 'Limpia profundamente el cabello, eliminando impurezas, residuos y exceso de grasa, dejando una sensación de frescura y ligereza.',
                'price' => 69.9,
                'discount' => 0,
                'image' => 'shampoo.png'
            ],
            [
                'name' => 'Acondicionador',
                'description' => 'Hidrata y suaviza el cabello, facilitando el desenredo y dejándolo manejable y sedoso al tacto.',
                'price' => 69.9,
                'discount' => 0,
                'image' => 'conditioner.png'
            ],
            [
                'name' => 'Crema de peinar',
                'description' => 'Define, controla y reduce el frizz, proporcionando un acabado suave y estilizado sin necesidad de enjuagar. Ideal para mantener el peinado perfecto durante todo el día.',
                'price' => 69.9,
                'discount' => 0,
                'image' => 'leave-in-cream.png'
            ],
        ];

        foreach ($items as $item) {
            Item::updateOrCreate(['name' => $item['name']], $item);
        }
    }
}
