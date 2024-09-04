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
                'name' => 'Leslie Alexander',
                'country' => 'South Africa'
            ],
            [
                'name' => 'Guy Hawkins',
                'country' => 'UK'
            ],
            [
                'name' => 'Wade Warren',
                'country' => 'Australia'
            ],
        ];

        foreach ($testimonies as $testimony) {
            Testimony::updateOrCreate(
                ['name' => $testimony['name']],
                [
                    'country' => $testimony['country'],
                    'description' => 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed que, Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed.'
                ]
            );
        }
    }
}
