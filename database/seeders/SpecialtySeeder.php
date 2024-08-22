<?php

namespace Database\Seeders;

use App\Models\Specialty;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SpecialtySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $specialties = [
            "De Vida",
            "Transformacional",
            "Organizacional",
            "Ejecutivo",
            "Corporal",
            "Comercial",
            "Biodanza y Coaching",
            "Perdón Radical",
            "Espiritual",
            "Agildiad del Negocio",
            "Cambio Organizacional",
            "Gestión de Proyectos",
            "Gestión de Procesos",
            "Gestión Comercial",
            "Gestión de Marketing",
            "Gestión de Servicios",
            "Marca Personal",
            "Emprendimiento & StartUps"
        ];

        foreach ($specialties as $specialty) {
            Specialty::updateOrCreate([
                'name' => $specialty
            ]);
        }
    }
}
