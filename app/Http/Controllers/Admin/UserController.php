<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends BasicController
{
    public $model = User::class;
    public $reactView = 'Users';
    public $ignoreStatusFilter = true;

    public function setPaginationInstance(string $model)
    {
        return $model::withCount(['sales'])
            ->where('email', '<>', 'admin@mundoweb.pe');
    }
}
