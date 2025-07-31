<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Property;
use Illuminate\Support\Str;

class GeneratePropertySlugs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'properties:generate-slugs {--force : Force regenerate slugs even if they already exist}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate slugs for all properties that don\'t have them';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $force = $this->option('force');
        
        $query = Property::query();
        
        if (!$force) {
            $query->whereNull('slug');
        }
        
        $properties = $query->get();
        
        if ($properties->isEmpty()) {
            $this->info('No properties found that need slug generation.');
            return 0;
        }
        
        $this->info("Found {$properties->count()} properties to process...");
        
        $progressBar = $this->output->createProgressBar($properties->count());
        $progressBar->start();
        
        $updated = 0;
        $existingSlugs = [];
        
        foreach ($properties as $property) {
            // Generar slug base del título
            $baseSlug = Str::slug($property->title);
            
            // Si no hay título, usar el address
            if (empty($baseSlug)) {
                $baseSlug = Str::slug($property->address);
            }
            
            // Si aún no hay slug, usar el ID
            if (empty($baseSlug)) {
                $baseSlug = 'propiedad-' . $property->id;
            }
            
            // Asegurar que el slug sea único
            $slug = $baseSlug;
            $counter = 1;
            
            while (in_array($slug, $existingSlugs) || Property::where('slug', $slug)->where('id', '!=', $property->id)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }
            
            // Actualizar la propiedad
            $property->update(['slug' => $slug]);
            $existingSlugs[] = $slug;
            
            $updated++;
            $progressBar->advance();
        }
        
        $progressBar->finish();
        $this->newLine();
        
        $this->info("✅ Successfully generated slugs for {$updated} properties!");
        
        // Mostrar algunos ejemplos
        $this->newLine();
        $this->line('Examples of generated slugs:');
        
        $examples = Property::whereNotNull('slug')->limit(5)->get();
        foreach ($examples as $example) {
            $this->line("  • {$example->title} → {$example->slug}");
        }
        
        return 0;
    }
}
