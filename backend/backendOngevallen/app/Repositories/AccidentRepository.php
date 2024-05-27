<?php

namespace App\Repositories;

use App\Models\Accident;
use App\DTO\AccidentDTO;
use App\Interfaces\IAccidentRepository;
use proj4php\Proj4php;
use proj4php\Proj;
use proj4php\Point;
use Illuminate\Support\Facades\Cache;

class AccidentRepository implements IAccidentRepository
{
    private $proj4;
    private $projLambert72;
    private $projWGS84;

    public function __construct()
    {
        $this->proj4 = new Proj4php();
        $this->projLambert72 = new Proj('EPSG:31370', $this->proj4); // Lambert 72
        $this->projWGS84 = new Proj('EPSG:4326', $this->proj4); // WGS 84
    }

    public function getAllAccidents($perPage = 10000)
    {
        return Accident::paginate($perPage)->map(function ($accident) {
            $pointSrc = new Point($accident->longitude, $accident->latitude, $this->projLambert72);
            $pointDest = $this->proj4->transform($this->projWGS84, $pointSrc);

            return new AccidentDTO(
                $accident->id,
                $accident->JAAR,
                $accident->MAAND,
                $accident->TIJD,
                $accident->NIS,
                $accident->REGIO,
                $accident->PROVINCIE,
                $accident->STAD,
                $accident->KRUISPUNT,
                $accident->BEBOUWINGSGEBIED,
                $pointDest->x,  // longitude
                $pointDest->y   // latitude
            );
        });
    }

    public function getUniqueFilterValues()
    {
        return [
            'jaarMaand' => $this->getUniqueYearMonthValues(),
            'tijd' => $this->getUniqueValues('TIJD'),
            'regio' => $this->getUniqueValues('REGIO'),
            'provincie' => $this->getUniqueValues('PROVINCIE'),
            'stad' => $this->getUniqueValues('STAD'),
            'kruispunt' => $this->getUniqueValues('KRUISPUNT'),
            'bebouwingsgebied' => $this->getUniqueValues('BEBOUWINGSGEBIED'),
        ];
    }

    public function getUniqueValues($column)
    {
        $cacheKey = 'unique_values_' . $column;

        Cache::forget($cacheKey);

        return Cache::remember($cacheKey, 3600, function () use ($column) {
            return Accident::select($column)->distinct()->orderBy($column)->pluck($column);
        });
    }

    public function getUniqueYearMonthValues()
    {
        $cacheKey = 'unique_values_year_month';

        Cache::forget($cacheKey);

        return Cache::remember($cacheKey, 3600, function () {
            return Accident::selectRaw("DISTINCT JAAR, MAAND")
                ->orderByRaw("JAAR ASC, MAAND ASC")
                ->get()
                ->map(function ($item) {
                    return [
                        'jaar' => $item->JAAR,
                        'maand' => $item->MAAND,
                        'formatted' => $item->MAAND . '/' . $item->JAAR
                    ];
                });
        });
    }

    public function processBatch($offset, $limit)
    {
        $accidents = Accident::offset($offset)->limit($limit)->get();
        foreach ($accidents as $accident) {
            $pointSrc = new Point($accident->XCORDINAAT, $accident->YCORDINAAT, $this->projLambert72);
            $pointDest = $this->proj4->transform($this->projWGS84, $pointSrc);

            $accident->XCORDINAAT = $pointDest->x;
            $accident->YCORDINAAT = $pointDest->y;
            $accident->save(); // Update en sla het record op met de nieuwe coördinaten
        }
    }
}