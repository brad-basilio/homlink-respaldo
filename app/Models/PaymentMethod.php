<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PaymentMethod extends Model
{
       use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'name',
        'slug', 
        'description',
        'image',
        'type',
        'order',
        'visible',
        'status'
    ];

    protected $casts = [
        'visible' => 'boolean',
        'status' => 'boolean',
        'order' => 'integer'
    ];

    // Scopes para filtros
    public function scopeActive(Builder $query)
    {
        return $query->where('status', true);
    }

    public function scopeVisible(Builder $query) 
    {
        return $query->where('visible', true);
    }

    public function scopeOrdered(Builder $query)
    {
        return $query->orderBy('order', 'asc')->orderBy('name', 'asc');
    }

    public function scopeByType(Builder $query, string $type)
    {
        return $query->where('type', $type);
    }

    // Scopes específicos para tipos
    public function scopeImmediate10Min(Builder $query)
    {
        return $query->where('type', 'immediate_10min');
    }

    public function scopeImmediate24H(Builder $query)
    {
        return $query->where('type', 'immediate_24h');
    }

    // Accessors para obtener nombres de tipos
    public function getTypeNameAttribute()
    {
        return match($this->type) {
            'immediate_10min' => 'Transferencias Inmediatas 10 min',
            'immediate_24h' => 'Transferencias Inmediatas 24h',
            default => $this->type
        };
    }

    // Constantes para los tipos
    const TYPE_IMMEDIATE_10MIN = 'immediate_10min';
    const TYPE_IMMEDIATE_24H = 'immediate_24h';

    public static function getTypes()
    {
        return [
            self::TYPE_IMMEDIATE_10MIN => 'Transferencias Inmediatas 10 min',
            self::TYPE_IMMEDIATE_24H => 'Transferencias Inmediatas 24h'
        ];
    }
}
