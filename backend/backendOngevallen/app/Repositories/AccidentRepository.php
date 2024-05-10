<?php

namespace App\Repositories; 

use App\Models\Accident; 
use App\DTO\AccidentDTO;
use App\Interfaces\IAccidentRepository;

class AccidentRepository implements IAccidentRepository
{
    public function getAllAccidents()
    {
        return Accident::limit(10)->get()->map(function ($accident) {
            return new AccidentDTO(
                $accident->JAAR,
                $accident->MAAND,
                $accident->TIJD,
                $accident->NIS,
                $accident->REGIO,
                $accident->PROVINCIE,
                $accident->STAD
            );
        });
    }
}