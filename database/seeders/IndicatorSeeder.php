<?php

namespace Database\Seeders;

use App\Models\Indicator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IndicatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $indicators = [
            ['symbol' => 'k', 'name' => '10', 'description' => '10K de usuarios activos'],
            ['symbol' => '+', 'name' => '20', 'description' => 'Neque porro quisquam est voluptatem'],
            ['symbol' => '+', 'name' => '10', 'description' => 'Neque porro quisquam est voluptatem'],
        ];

        Indicator::where('status', true)->delete();
        foreach ($indicators as $indicator) {
            Indicator::create($indicator);
        }
    }
}
