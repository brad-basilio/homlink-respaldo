<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;

class AdminNotifiable
{
    use Notifiable;

    public $email;
    public $name;

    public function __construct($email, $name = 'Administrador')
    {
        $this->email = $email;
        $this->name = $name;
    }

    public function routeNotificationForMail($notification)
    {
        return $this->email;
    }
}
