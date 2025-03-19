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
        'slug',
        'name',
        'summary',
        'description',
        'price',
        'discount',
        'final_price',
        'discount_percent',
        'banner',
        'image',
        'category_id',
        'is_new',
        'offering',
        'recommended',
        'featured',
        'visible',
        'status',
        'sku',
        'stock',
    ];
    /*
     
    */

    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    public function colors()
    {
        return $this->hasMany(ItemColor::class);
    }
    public function images()
    {
        return $this->hasMany(ItemImage::class);
    }
    public function zises()
    {
        return $this->hasMany(ItemZise::class);
    }

    protected static function booted()
    {
        static::creating(function ($item) {
            if (empty($item->sku)) {
                $item->sku = 'PROD-' . strtoupper(substr($item->categoria_id, 0, 3)) . '-' . strtoupper(substr($item->name, 0, 3)) . '-' . uniqid();
            }
        });
    }
}
