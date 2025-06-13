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
        User::updateOrCreate([
            'email' => 'admin@mundoweb.pe'
        ], [
            'name' => 'Usuario',
            'lastname' => 'Admin',
            'password' => 'r00tme'
        ])->assignRole('Admin');
        User::updateOrCreate([
            'email' => 'admin@cambiogerencia.com.pe'
        ], [
            'name' => 'Admin',
            'lastname' => 'Cambio & Gerencia',
            'password' => 'C@mbio&G3renc1a!2025'
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
