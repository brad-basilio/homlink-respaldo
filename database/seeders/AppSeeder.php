<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AppSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\App::create([
            'name' => 'Google Play',
            'link' => 'https://play.google.com/store/apps/details?id=com.homlynk.app',
            'order' => 1,
            'status' => true,
        ]);

        \App\Models\App::create([
            'name' => 'App Store',
            'link' => 'https://apps.apple.com/app/homlynk/id123456789',
            'order' => 2,
            'status' => true,
        ]);

        \App\Models\App::create([
            'name' => 'AppGallery',
            'link' => 'https://appgallery.cloud.huawei.com/app/C123456789',
            'order' => 3,
            'status' => false,
        ]);
    }
}
