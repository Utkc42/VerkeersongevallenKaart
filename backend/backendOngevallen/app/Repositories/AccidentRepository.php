<?php

namespace App\Repositories;

use App\Models\Accident;
use App\Interfaces\IAccidentRepository;
use Illuminate\Support\Facades\Cache;

class AccidentRepository implements IAccidentRepository
{
    /**
     * Haalt een gespecificeerd aantal ongevallen op met paginatie.
     *
     * @param int $perPage Het aantal ongevallen per pagina.
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getAllAccidents($perPage = 100)
    {
        return Accident::paginate($perPage);
    }

    /**
     * Haalt alle unieke waarden op voor gespecificeerde kolommen om te gebruiken als filters.
     *
     * @return array
     */
    public function getUniqueFilterValues()
    {
        return [
            'jaar' => $this->getUniqueValues('JAAR'),
            'maand' => $this->getUniqueValues('MAAND'),
            'tijd' => $this->getUniqueValues('TIJD'),
            'regio' => $this->getUniqueValues('REGIO'),
            'provincie' => $this->getUniqueValues('PROVINCIE'),
            'stad' => $this->getUniqueValues('STAD'),
            'kruispunt' => $this->getUniqueValues('KRUISPUNT'),
            'weer' => $this->getUniqueValues('WEER'),
            'wegconditie' => $this->getUniqueValues('WEGCONDITIE'),
            'bebouwingsgebied' => $this->getUniqueValues('BEBOUWINGSGEBIED'),
            'weerlich' => $this->getUniqueValues('WEERLICH'),
            'wegtype' => $this->getUniqueValues('WEGTYPE'),
            'verkeersslachtoffers' => $this->getUniqueValues('VERKEERSSLACHTOFFERS'),
            'voertuigtype1' => $this->getUniqueValues('VOERTUIGTYPE1'),
            'voertuigtype2' => $this->getUniqueValues('VOERTUIGTYPE2'),
            'botsingtype' => $this->getUniqueValues('BOTSINGTYPE'),
            'obstakels' => $this->getUniqueValues('OBSTAKELS'),
        ];
    }

    /**
     * Haalt unieke waarden op uit een gespecificeerde kolom, eventueel gecached.
     *
     * @param string $column De kolomnaam waarvan unieke waarden moeten worden opgehaald.
     * @return \Illuminate\Support\Collection
     */
    public function getUniqueValues($column)
    {
        $cacheKey = 'unique_' . $column;
        return Cache::remember($cacheKey, 3600, function () use ($column) {
            return Accident::distinct($column)->orderBy($column, 'asc')->pluck($column);
        });
    }

    public function processBatch($offset, $batchSize)
    {
        $accidents = Accident::skip($offset)->take($batchSize)->get();

        foreach ($accidents as $accident) {
            // Voorbeeld van een conversie functie die je zou kunnen implementeren of gebruiken
            [$newLongitude, $newLatitude] = $this->convertCoordinates($accident->longitude, $accident->latitude);

            $accident->longitude = $newLongitude;
            $accident->latitude = $newLatitude;
            $accident->save();
        }
    }

    private function convertCoordinates($longitude, $latitude)
    {
        // Implementatie van de conversie van Lambert 72 naar WGS 84
        // Dit is slechts een voorbeeld en moet worden vervangen door de daadwerkelijke conversie logica
        return [$longitude + 0.0001, $latitude + 0.0001];
    }
}