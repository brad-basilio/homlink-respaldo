<?php

namespace Database\Seeders;

use App\Models\Benefit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BenefitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $benefits = [
            ['icon' => 'fas fa-link', 'name' => 'Tecnología'],
            ['icon' => 'fas fa-chart-line', 'name' => 'Metodología orientada a los resultados'],
            ['icon' => 'fas fa-medal', 'name' => 'Experiencia y trayectoria de coaches'],
            ['icon' => 'fas fa-volume-off', 'name' => 'Estrategia e Innovación'],
        ];

        foreach ($benefits as $benefit) {
            Benefit::updateOrCreate(['name' => $benefit['name']], ['icon' => $benefit['icon']]);
        }
    }
}
