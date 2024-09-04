<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends BasicController
{
    public $model = Event::class;
    public $reactView = 'Admin/Events';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $events = Event::upcoming();
        return [
            'events' => $events
        ];
    }
}
