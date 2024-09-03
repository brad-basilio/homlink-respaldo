<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'lastname',
        'email',
        'specialties',
        'password',
        'person_id',
        'confirmation_token',
        'role',
        'token',
    ];

    public function person()
    {
        return $this->belongsTo(Person::class, 'person_id');
    }
}
