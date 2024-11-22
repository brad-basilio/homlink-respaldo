<?php

namespace Database\Seeders;

use App\Models\Coupon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $coupon = [
            'name' => '1ER_VUA',
            'description' => 'Cupón de descuento para la primera compra',
            'type' => 'percentage',
            'amount' => 10,
            'sale_amount' => 0,
            'one_time_use' => true,
        ];

        Coupon::updateOrCreate(['name' => $coupon['name']], $coupon);
    }
}
