<?php

namespace App\Imports;

use App\Models\Ongeval;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class OngevallenImport implements ToModel, WithHeadingRow, WithChunkReading
{
    public function model(array $row)
    {
        return new Ongeval([
            'dt_year_collision' => $row['dt_year_collision'],
            'dt_month_collision' => $row['dt_month_collision'],
            'dt_time' => $row['dt_time'],
            'cd_nis' => $row['cd_nis'],
            'tx_rgn_collision_nl' => $row['tx_rgn_collision_nl'],
            'tx_prov_collision_nl' => $row['tx_prov_collision_nl'],
            'tx_munty_collision_nl' => $row['tx_munty_collision_nl'],
            'ms_x_coord' => $row['ms_x_coord'],
            'ms_y_coord' => $row['ms_y_coord'],
            'tx_crossway_nl' => $row['tx_crossway_nl'],
            'tx_weather_nl' => $row['tx_weather_nl'],
            'tx_road_condition_nl' => $row['tx_road_condition_nl'],
            'tx_build_up_area_nl' => $row['tx_build_up_area_nl'],
            'tx_light_condition_nl' => $row['tx_light_condition_nl'],
            'cd_road_type_nl' => $row['cd_road_type_nl'],
            'tx_class_accidents_nl' => $row['tx_class_accidents_nl'],
            'tx_road_usr_type1_nl' => $row['tx_road_usr_type1_nl'],
            'tx_road_usr_type2_nl' => $row['tx_road_usr_type2_nl'],
            'tx_collision_type_nl' => $row['tx_collision_type_nl'],
            'tx_obstacles_nl' => $row['tx_obstacles_nl'],
        ]);
    }

    public function headingRow(): int
    {
        return 1; // Indien de eerste rij de koppen bevat
    }

    public function chunkSize(): int
    {
        return 1000; // Pas dit aan gebaseerd op je geheugenbeperkingen
    }
}