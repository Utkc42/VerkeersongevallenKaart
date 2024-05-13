<?php

namespace App\Interfaces;

interface IAccidentRepository
{
    /**
     * Haalt een gespecificeerd aantal ongevallen op met paginatie.
     *
     * @param int $perPage Het aantal ongevallen per pagina.
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getAllAccidents($perPage);

    /**
     * Haalt alle unieke waarden op voor gespecificeerde kolommen om te gebruiken als filters.
     *
     * @return array
     */
    public function getUniqueFilterValues();

    /**
     * Haalt unieke waarden op uit een gespecificeerde kolom.
     *
     * @param string $column De kolomnaam waarvan unieke waarden moeten worden opgehaald.
     * @return \Illuminate\Support\Collection
     */
    public function getUniqueValues($column);
}