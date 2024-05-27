<?php

namespace App\Http\Controllers;

use App\Interfaces\IAccidentRepository;
use Illuminate\Http\Request;
use App\Models\Accident;

class AccidentController extends Controller
{
    protected $accidentRepo;

    public function __construct(IAccidentRepository $accidentRepo)
    {
        $this->accidentRepo = $accidentRepo;
    }

    public function index(Request $request)
    {
        $query = Accident::query();  // Start de query

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

        if ($request->has('jaarMaand')) {
            $jaarMaand = explode('/', $request->input('jaarMaand'));
            if (count($jaarMaand) == 2) {
                $query->where('JAAR', $jaarMaand[1])
                      ->where('MAAND', $jaarMaand[0]);
            }
        }

        $accidents = $query->paginate(10000); 
        return response()->json($accidents);
    }

    public function getFilterData()
    {
        $filterData = $this->accidentRepo->getUniqueFilterValues();
        return response()->json($filterData);
    }
}