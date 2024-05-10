<?php

// app/Http/Controllers/AccidentController.php

namespace App\Http\Controllers;

use App\Interfaces\IAccidentRepository;

class AccidentController extends Controller
{
    protected $accidentRepo;

    public function __construct(IAccidentRepository $accidentRepo)
    {
        $this->accidentRepo = $accidentRepo;
    }

    public function index()
    {
        $accidents = $this->accidentRepo->getAllAccidents();
        return response()->json($accidents);
    }
}