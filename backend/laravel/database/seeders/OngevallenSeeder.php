<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\OngevallenImport;

class OngevallenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Verander het pad naar het daadwerkelijke pad van je Excel-bestand
        $path = base_path('database/data/ongevallen.xlsx');

        Excel::import(new OngevallenImport, $path);
    }
}