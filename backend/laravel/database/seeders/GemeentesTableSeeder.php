<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Gemeente;

class GemeentesTableSeeder extends Seeder
{
    public function run()
    {
        $path = base_path('database/data/gemeentes.geojson');
        
        if (!File::exists($path)) {
            echo "Het GeoJSON-bestand is niet gevonden op het opgegeven pad: {$path}\n";
            return;
        }
        
        $geojson = json_decode(File::get($path), true);

        foreach ($geojson['features'] as $feature) {
            Gemeente::create([
                'niscode' => $feature['properties']['niscode'],
                'name' => $feature['properties']['namedut'],
                'arrondissementcapital' => $feature['properties']['arrondissementcapital'],
                'provincecapital' => $feature['properties']['provincecapital'],
                'regioncapital' => $feature['properties']['regioncapital'],
                'countrycapital' => $feature['properties']['countrycapital'],
                'geometry' => json_encode($feature['geometry']),
            ]);
        }

        echo "GeoJSON data succesvol geïmporteerd in de database.\n";
    }
}