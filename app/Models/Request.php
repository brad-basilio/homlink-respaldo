<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'coach_id',
        'coachee_id',
        'status',
        'status_message',
    ];

    public function coach()
    {
        return $this->hasOne(User::class, 'id', 'coach_id');
    }
    public function coachee()
    {
        return $this->hasOne(User::class, 'id', 'coachee_id');
    }
}
