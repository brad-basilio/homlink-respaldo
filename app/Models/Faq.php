<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'description',
        'visible',
        'status',
        'service_id',
        'lang_id',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
    public function lang()
    {
        return $this->belongsTo(Lang::class, 'lang_id');
    }
}
