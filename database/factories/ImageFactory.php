<?php

namespace Database\Factories;

use App\Models\Image;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *  @var string
     */
     
      protected $model =Image::class;

     /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'url' => 'posts/' . $this->faker->image('public/storage/posts',640 , 480, null, false),
        ];
    }
}
