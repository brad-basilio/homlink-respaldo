<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'description',
        'specialty_id',
        'social_media',
        'media_id',
        'tags',
        'owner_id',
        'status'
    ];

    public function specialty()
    {
        return $this->hasOne(Specialty::class, 'id', 'specialty_id');
    }
    public function owner()
    {
        return $this->hasOne(User::class, 'id', 'owner_id');
    }
}
