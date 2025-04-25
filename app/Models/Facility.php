<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    use HasFactory, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'title',
        'description',
        'link',
        'visible',
        'status',
        'slug',
        'ubications',
        'phones',
        'emails',
        'business_hours',
        'gallery',
        'view',
        'lang_id'
    ];

    protected $casts = [
        'ubications' => 'array',
        'phones' => 'array',
        'emails' => 'array',
        'business_hours' => 'array',
        'gallery' => 'array'
    ];
    public function lang()
    {
        return $this->belongsTo(Lang::class);
    }
}
