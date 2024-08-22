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
        ],[
            'name' => 'Usuario',
            'lastname' => 'Admin',
            'email' => 'admin@mundoweb.pe',
            'password' => 'r00tme'
        ])->assignRole('Admin');
        User::updateOrCreate([
            'email' => 'gamboapalominocarlosmanuel@gmail.com'
        ],[
            'name' => 'Manuel',
            'lastname' => 'Gamboa',
            'email' => 'gamboapalominocarlosmanuel@gmail.com',
            'password' => 'abcd1234'
        ])->assignRole('Coach');
    }
}
