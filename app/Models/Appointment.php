<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'lastname_father',
        'lastname_mother',
        'document',
        'email',
        'number',
        'description',
        'seen',
        'status',
    ];

    protected $casts = [
        'seen' => 'boolean',
        'status' => 'boolean',
    ];
}
