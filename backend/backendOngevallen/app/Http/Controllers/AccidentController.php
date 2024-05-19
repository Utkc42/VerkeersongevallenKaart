<?php

namespace App\Http\Controllers;

use App\Interfaces\IAccidentRepository;
use Illuminate\Http\Request;
use App\Models\Accident;

class AccidentController extends Controller
{
    protected $accidentRepo;

    /**
     * Maak een nieuwe controller instantie.
     *
     * @param IAccidentRepository $accidentRepo
     */
    public function __construct(IAccidentRepository $accidentRepo)
    {
        $this->accidentRepo = $accidentRepo;
    }
    
    //ini_set('memory_limit', '512M');
    /**
     * Geeft een lijst van alle ongevallen met paginatie.
     *
     * @return \Illuminate\Http\Response
     */
public function index(Request $request)
{
    $query = Accident::query();  // Start de query

    // Voeg filters toe voor elk veld waarop gefilterd kan worden
    $filters = [
         'JAAR' => 'jaar',
        'MAAND' => 'maand',
        'TIJD' => 'tijd',
        'REGIO' => 'regio',
        'STAD' => 'stad',
        'KRUISPUNT' => 'kruispunt',
        'BEBOUWINGSGEBIED' => 'bebouwingsgebied',
        'WEGTYPE' => 'wegtype',
        'WEER' => 'weer',
        'WEERLICHT' => 'weerlicht'
    ];

    foreach ($filters as $column => $param) {
        if ($request->has($param)) {
            $query->whereIn($column, (array) $request->input($param));
        }
    }

    // Voeg een specifieke filter toe voor jaar/maand combinatie
    if ($request->has('jaarMaand')) {
        $jaarMaand = explode('/', $request->input('jaarMaand'));
        if (count($jaarMaand) == 2) {
            $query->where('JAAR', $jaarMaand[1])
                  ->where('MAAND', $jaarMaand[0]);
        }
    }

    // Gebruik paginatie om de resultaten beheersbaar te houden
    $accidents = $query->paginate(100000); 
    return response()->json($accidents);
}




    /**
     * Geeft een JSON response van unieke waarden voor filters.
     *
     * @return \Illuminate\Http\Response
     */
    public function getFilterData()
    {
        $filterData = $this->accidentRepo->getUniqueFilterValues();
        return response()->json($filterData);
    }
}