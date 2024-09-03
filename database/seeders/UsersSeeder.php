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
            'password' => 'r00tme'
        ])->assignRole('Admin');

        User::updateOrCreate([
            'email' => 'coach@mundoweb.pe'
        ], [
            'name' => 'Usuario',
            'lastname' => 'Coach',
            'password' => 'r00tme'
        ])->assignRole('Coach');

        User::updateOrCreate([
            'email' => 'coachee@mundoweb.pe'
        ], [
            'name' => 'Usuario',
            'lastname' => 'Coachee',
            'password' => 'r00tme'
        ])->assignRole('Coachee');
    }
}
