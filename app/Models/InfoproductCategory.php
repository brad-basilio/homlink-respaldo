<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfoproductCategory extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'infoproduct_categories';
    protected $fillable = [
        'name',
        'description',
        'slug',
        'visible',
        'status'
    ];

    public function infoproducts()
    {
        return $this->hasMany(Infoproduct::class, 'category_id');
    }
}
