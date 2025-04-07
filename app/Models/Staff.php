<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'image',
        'job',
        'name',
        'description',
        'visible',
        'status',
        'slug',
        'characteristics',
        'socials',
    ];
    protected $casts = [
        'characteristics' => 'array',
        'socials' => 'array'
    ];
}
