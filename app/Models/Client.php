<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $conection = "mysql_atalaya";

    protected $fillable=['ruc','name', 'description', 'contact_name', 'contact_phone' , 'contact_email', 'contact_address' ,'contact_position', 'message' ,
                        'web_url', 'source', 'fecha', 'hora', 'ip', 'origin', 'client_width', 'client_height', 'client_latitude', 'client_longitude', 
                        'client_system', 'status_id'
                        ];
}
