<?php

namespace Database\Seeders;

use App\Models\General;
use Illuminate\Database\Seeder;

class SeoGeneralSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seoData = [
            [
                'correlative' => 'company_name',
                'name' => 'Nombre de la Empresa',
                'description' => 'homLynk - homLynk S.A.C.'
            ],
            [
                'correlative' => 'company_description',
                'name' => 'Descripción de la Empresa',
                'description' => 'Casa de cambio online líder en Perú con las mejores tasas de cambio y total seguridad en tus transacciones.'
            ],
            [
                'correlative' => 'company_logo',
                'name' => 'Logo de la Empresa',
                'description' => '/assets/img/logo-og.png'
            ],
            [
                'correlative' => 'company_url',
                'name' => 'URL de la Empresa',
                'description' => 'https://homlynk.com'
            ],
            [
                'correlative' => 'company_phone',
                'name' => 'Teléfono de la Empresa',
                'description' => '+51 945 622 983'
            ],
            [
                'correlative' => 'company_email',
                'name' => 'Email de la Empresa',
                'description' => 'info@homlynk.com'
            ],
            [
                'correlative' => 'company_address',
                'name' => 'Dirección de la Empresa',
                'description' => 'Lima, Perú'
            ],
            [
                'correlative' => 'twitter_site',
                'name' => 'Twitter Site',
                'description' => '@homlynk'
            ],
            [
                'correlative' => 'facebook_page',
                'name' => 'Página de Facebook',
                'description' => 'https://facebook.com/homlynk'
            ],
            [
                'correlative' => 'instagram_profile',
                'name' => 'Perfil de Instagram',
                'description' => 'https://instagram.com/homlynk'
            ],
            [
                'correlative' => 'linkedin_profile',
                'name' => 'Perfil de LinkedIn',
                'description' => 'https://linkedin.com/company/homlynk'
            ],
            [
                'correlative' => 'og_image_default',
                'name' => 'Imagen Open Graph por Defecto',
                'description' => '/assets/img/og-default.jpg'
            ],
            [
                'correlative' => 'twitter_image_default',
                'name' => 'Imagen Twitter por Defecto',
                'description' => '/assets/img/twitter-default.jpg'
            ]
        ];

        foreach ($seoData as $data) {
            General::updateOrCreate(
                ['correlative' => $data['correlative']],
                [
                    'name' => $data['name'],
                    'description' => $data['description']
                ]
            );
        }

        $this->command->info('Datos SEO agregados exitosamente a la tabla generals.');
    }
}
