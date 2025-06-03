<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Infoproduct extends Model
{
    use HasFactory,HasUlids;
    protected $table = 'infoproducts';
    protected $fillable = [
        'name',
        'summary',
        'image',
        'info_date',
        'collaborator',
        'status',
        'category_id'
    ];
  
    public function category()
    {
        return $this->belongsTo(InfoproductCategory::class, 'category_id');
    }

}
