<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'code',
        'user_formula_id',
        'user_id',
        'name',
        'lastname',
        'email',
        'phone',
        'country',
        'department',
        'province',
        'district',
        'zip_code',
        'address',
        'number',
        'reference',
        'amount',
        'delivery',
        'bundle_discount',
        'bundle_id',
        'renewal_discount',
        'renewal_id',
        'coupon_discount',
        'coupon_id',
    ];
}
