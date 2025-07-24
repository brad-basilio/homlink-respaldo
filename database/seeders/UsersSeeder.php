<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Eliminar el usuario anterior de cambiogerencia.com.pe si existe
        User::where('email', 'admin@cambiogerencia.com.pe')->delete();
        
        User::updateOrCreate([
            'email' => 'admin@mundoweb.pe'
        ], [
            'name' => 'Usuario',
            'lastname' => 'Admin',
            'password' => 'r00tme'
        ])->assignRole('Admin');
        
        User::updateOrCreate([
            'email' => 'admin@cambiafx.com'
        ], [
            'name' => 'Admin',
            'lastname' => 'CambiaFX',
            'password' => 'C@mbiaFX!2025'
        ])->assignRole('Admin');

        User::updateOrCreate([
            'email' => 'admin@cambiafx.pe'
        ], [
            'name' => 'Admin',
            'lastname' => 'CambiaFX Peru',
            'password' => 'C@mbiaFX.Pe!2025'
        ])->assignRole('Admin');

        User::updateOrCreate([
            'email' => 'customer@mundoweb.pe'
        ], [
            'name' => 'Usuario',
            'lastname' => 'Customer',
            'password' => 'abcd1234'
        ])->assignRole('Customer');
    }
}
