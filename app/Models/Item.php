<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'description',
        'price',
        'discount',
        'image',
        'is_default',
        'featured',
        'visible',
        'status',
    ];

    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    public function colors()
    {
        return $this->hasMany(Color::class);
    }
}
