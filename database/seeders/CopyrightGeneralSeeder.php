<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CopyrightGeneralSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener el ID del idioma español (o el idioma por defecto)
        $langId = DB::table('langs')->where('is_default', true)->first()?->id;

        if (!$langId) {
            $this->command->error('No se encontró ningún idioma en la base de datos.');
            return;
        }

        // Verificar si ya existe el correlativo copyright
        $exists = DB::table('generals')
            ->where('correlative', 'copyright')
            ->where('lang_id', $langId)
            ->exists();

        if ($exists) {
            $this->command->info('El correlativo "copyright" ya existe en la base de datos.');
            return;
        }

        // Insertar el nuevo general para copyright
        DB::table('generals')->insert([
            'id' => Str::uuid(),
            'lang_id' => $langId,
            'correlative' => 'copyright',
            'name' => 'Texto de Copyright',
            'description' => 'Cambia FX © 2019 - Marca registrada de Tu Cambio S.A.C. - RUC: 20603864957',
            'status' => '1',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->command->info('Correlativo "copyright" agregado exitosamente a la tabla generals.');
    }
}
