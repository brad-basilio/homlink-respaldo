<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bundle extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'description',
        'percentage',
        'items_quantity',
        'comparator',
        'includes_all_items',
        'status',
    ];

    protected $casts = [
        'percentage' => 'decimal:2',
        'items_quantity' => 'integer',
        'includes_all_items' => 'boolean',
        'status' => 'boolean',
    ];

    public function items () {
        return $this->hasManyThrough(Item::class, BundleItem::class, 'bundle_id', 'id', 'id', 'item_id');
    }
}
