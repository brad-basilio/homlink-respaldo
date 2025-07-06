<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PaymentMethod;
use SoDe\Extend\Crypto;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paymentMethods = [
            // Transferencias Inmediatas 10 min
            [
                'name' => 'BCP',
                'slug' => 'bcp',
                'description' => 'Banco de Crédito del Perú',
                'type' => 'immediate_10min',
                'order' => 1,
                'visible' => true,
                'status' => true
            ],
            [
                'name' => 'Interbank',
                'slug' => 'interbank',
                'description' => 'Banco Internacional del Perú',
                'type' => 'immediate_10min',
                'order' => 2,
                'visible' => true,
                'status' => true
            ],
            [
                'name' => 'BANBIF',
                'slug' => 'banbif',
                'description' => 'Banco Internacional de Finanzas',
                'type' => 'immediate_10min',
                'order' => 3,
                'visible' => true,
                'status' => true
            ],
            [
                'name' => 'Yape',
                'slug' => 'yape',
                'description' => 'Aplicación móvil de pagos BCP',
                'type' => 'immediate_10min',
                'order' => 4,
                'visible' => true,
                'status' => true
            ],
            [
                'name' => 'Plin',
                'slug' => 'plin',
                'description' => 'Aplicación móvil de pagos',
                'type' => 'immediate_10min',
                'order' => 5,
                'visible' => true,
                'status' => true
            ],
            
            // Transferencias Inmediatas 24h
            [
                'name' => 'BBVA',
                'slug' => 'bbva',
                'description' => 'BBVA Continental',
                'type' => 'immediate_24h',
                'order' => 1,
                'visible' => true,
                'status' => true
            ],
            [
                'name' => 'Scotiabank',
                'slug' => 'scotiabank',
                'description' => 'Scotiabank Perú',
                'type' => 'immediate_24h',
                'order' => 2,
                'visible' => true,
                'status' => true
            ],
            [
                'name' => 'Banco Pichincha',
                'slug' => 'pichincha',
                'description' => 'Banco Pichincha',
                'type' => 'immediate_24h',
                'order' => 3,
                'visible' => true,
                'status' => true
            ],
            [
                'name' => 'Otros Bancos',
                'slug' => 'otros',
                'description' => 'Otros bancos y entidades financieras',
                'type' => 'immediate_24h',
                'order' => 4,
                'visible' => true,
                'status' => true
            ]
        ];

        foreach ($paymentMethods as $method) {
            // Usar el mismo sistema de UUID que el resto de la aplicación
            $method['id'] = Crypto::randomUUID();
            PaymentMethod::create($method);
        }
    }
}
