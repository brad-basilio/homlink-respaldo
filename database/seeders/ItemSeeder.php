<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use SoDe\Extend\JSON;

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
                'image' => 'c37e8988-4a91-4229-985f-3e9da0283318'
            ],
            [
                'name' => 'Acondicionador',
                'description' => 'Hidrata y suaviza el cabello, facilitando el desenredo y dejándolo manejable y sedoso al tacto.',
                'price' => 69.9,
                'discount' => 0,
                'image' => '2dca63e8-7e85-46f6-bc4f-9e0d6fe81dae'
            ],
            [
                'name' => 'Crema de peinar',
                'description' => 'Define, controla y reduce el frizz, proporcionando un acabado suave y estilizado sin necesidad de enjuagar. Ideal para mantener el peinado perfecto durante todo el día.',
                'price' => 69.9,
                'discount' => 0,
                'image' => 'e13b4ba3-9682-473c-beda-6bb76d1c069e'
            ],
        ];

        foreach ($items as $item) {
            Item::updateOrCreate(['name' => $item['name']], $item);
        }
    }
}
