<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use SoDe\Extend\Trace;

class Event extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'image',
        'type',
        'name',
        'date_time',
        'description',
    ];

    static function lastFour()
    {
        return Event::select([
            'image',
            'name',
            'type',
            'date_time',
            'description'
        ])
            ->where('visible', true)
            ->where('status', true)
            ->where('date_time','>', Trace::getDate('mysql'))
            ->orderBy('date_time', 'asc')
            ->take(4)
            ->get();
    }

    static function upcoming()
    {
        return Event::select([
            'image',
            'name',
            'type',
            'date_time',
            'description'
        ])
            ->where('visible', true)
            ->where('status', true)
            ->where('date_time', '>', Trace::getDate('mysql'))
            ->orderBy('date_time', 'asc')
            ->get();
    }
}
