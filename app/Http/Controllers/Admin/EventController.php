<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;

class EventController extends BasicController
{
    public $model = Event::class;
    public $reactView = 'Admin/Events';
    public $imageFields = ['image'];
}
