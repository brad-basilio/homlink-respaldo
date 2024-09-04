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

        $coaches = [
            ['name' => 'Coach 1', 'lastname' => 'Lastname 1', 'email' => 'coach1@mundoweb.pe'],
            ['name' => 'Coach 2', 'lastname' => 'Lastname 2', 'email' => 'coach2@mundoweb.pe'],
            ['name' => 'Coach 3', 'lastname' => 'Lastname 3', 'email' => 'coach3@mundoweb.pe'],
            ['name' => 'Coach 4', 'lastname' => 'Lastname 4', 'email' => 'coach4@mundoweb.pe'],
            ['name' => 'Coach 5', 'lastname' => 'Lastname 5', 'email' => 'coach5@mundoweb.pe'],
            ['name' => 'Coach 6', 'lastname' => 'Lastname 6', 'email' => 'coach6@mundoweb.pe'],
            ['name' => 'Coach 7', 'lastname' => 'Lastname 7', 'email' => 'coach7@mundoweb.pe'],
            ['name' => 'Coach 8', 'lastname' => 'Lastname 8', 'email' => 'coach8@mundoweb.pe'],
            ['name' => 'Coach 9', 'lastname' => 'Lastname 9', 'email' => 'coach9@mundoweb.pe'],
            ['name' => 'Coach 10', 'lastname' => 'Lastname 10', 'email' => 'coach10@mundoweb.pe'],
        ];

        foreach ($coaches as $coach) {
            User::updateOrCreate([
                'email' => $coach['email']
            ], [
                'name' => $coach['name'],
                'lastname' => $coach['lastname'],
                'password' => 'abcd1234',
                'price' => \random_int(100, 500),
                'trained_hours' => \random_int(100, 200),
                'experience' => \random_int(0, 20),
            ])->assignRole('Coach');
        }
    }
}
