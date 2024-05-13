<?php

namespace App\Http\Controllers;

use App\Interfaces\IAccidentRepository;
use Illuminate\Http\Request;

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

    /**
     * Geeft een lijst van alle ongevallen met paginatie.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $accidents = $this->accidentRepo->getAllAccidents(100); // Je kunt de paginatie aanpassen
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