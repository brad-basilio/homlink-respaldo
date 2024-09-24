<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use SoDe\Extend\Crypto;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminJpa = Role::updateOrCreate(['name' => 'Admin'], [
            'name' => 'Admin',
            'relative_id' => Crypto::randomUUID()
        ]);

        Permission::updateOrCreate(['name' => 'Admin'], ['name' => 'Admin'])
        ->syncRoles([$adminJpa]);
    }
}
