<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuccessStory extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    /**migration */
    protected $fillable = [
        'slug',
        'name',
        'summary',
        'description',
        'image',
        'title_benefits',
        'description_benefits',
        'benefits',
        'title_challenges',
        'description_challenges',
        'challenges',
        'solutions',
        'image_challenges',
        'category_project',
        'client_project',
        'date_start_project',
        'date_end_project',
        'duration',
        'services',
        'company_name',
        'company_logo',
        'company_summary',
        'company_percentage',
        'company_description_percentage',
        'visible',
        'status'
    ];
    protected $casts = [
        'benefits' => 'array',
        'challenges' => 'array',
        'solutions' => 'array',
        'services' => 'array',
    ];
}
