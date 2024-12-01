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
                'name' => 'Pendiente'
            ],
            [
                'id' => Crypto::randomUUID(),
                'name' => 'Pagado'
            ],
            [
                'id' => Crypto::randomUUID(),
                'name' => 'Rechazado'
            ],
            [
                'id' => Crypto::randomUUID(),
                'name' => 'Anulado'
            ],
            [
                'id' => Crypto::randomUUID(),
                'name' => 'Procesando'
            ],
            [
                'id' => Crypto::randomUUID(),
                'name' => 'Enviado'
            ],
            [
                'id' => Crypto::randomUUID(),
                'name' => 'Entregado'
            ],
        ];
        foreach ($statuses as $status) {
            Status::updateOrCreate(['name' => $status['name']], $status);
        }
    }
}
