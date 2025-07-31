<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ListProperties extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'properties:list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'List all properties with their slugs';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $properties = \App\Models\Property::all(['id', 'title', 'slug']);
        
        $this->info('Properties with slugs:');
        $this->newLine();
        
        foreach ($properties as $property) {
            $this->line("ID: {$property->id}");
            $this->line("Title: {$property->title}");
            $this->line("Slug: {$property->slug}");
            $this->line("URL: /property/{$property->slug}");
            $this->line('---');
        }
        
        return 0;
    }
}
