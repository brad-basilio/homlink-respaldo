<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;
use SoDe\Extend\Crypto;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            [
                'id' => 'f13fa605-72dd-4729-beaa-ee14c9bbc47b',
                'name' => 'Pendiente',
                'color' => '#6c757d',
                'editable' => false
            ],
            [
                'id' => '312f9a91-d3f2-4672-a6bf-678967616cac',
                'name' => 'Pagado',
                'color' => '#71b6f9',
                'editable' => false
            ],
            [
                'id' => 'd3a77651-15df-4fdc-a3db-91d6a8f4247c',
                'name' => 'Rechazado',
                'color' => '#ff5b5b',
                'editable' => false
            ],
            [
                'id' => Crypto::randomUUID(),
                'name' => 'Anulado',
                'color' => '#323a46',
                'reversible' => false
            ],
            [
                'id' => Crypto::randomUUID(),
                'name' => 'Procesando',
            ],
            [
                'id' => Crypto::randomUUID(),
                'name' => 'Enviado'
            ],
            [
                'id' => Crypto::randomUUID(),
                'name' => 'Entregado',
                'color' => '#10c469',
                'reversible' => false
            ],
        ];
        foreach ($statuses as $status) {
            Status::updateOrCreate(['name' => $status['name']], $status);
        }
    }
}
