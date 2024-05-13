<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Repositories\AccidentRepository;

class ConvertCoordinates extends Command
{
    protected $signature = 'convert:coordinates';
    protected $description = 'Converts Lambert 72 coordinates to WGS 84 for all accidents.';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle(AccidentRepository $repository)
    {
        $this->info('Starting the conversion of coordinates.');

        // Bepaal hoeveel records je per batch wilt verwerken
        $batchSize = 100;  // Aantal rijen per keer
        $total = \App\Models\Accident::count(); // Totaal aantal ongevallen
        $batches = ceil($total / $batchSize);

        for ($i = 0; $i < $batches; $i++) {
            $offset = $i * $batchSize;
            $this->info("Processing batch: " . ($i + 1) . " of $batches");
            $repository->processBatch($offset, $batchSize);
        }

        $this->info('All coordinates have been converted.');
    }
}