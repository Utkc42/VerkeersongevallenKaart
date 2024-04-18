<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ongeval extends Model
{
    /**
     * De tabel die geassocieerd wordt met het model.
     *
     * @var string
     */
    protected $table = 'ongevallen';

    /**
     * De attributen die mass-assignable zijn.
     *
     * @var array
     */
    protected $fillable = [
        'dt_year_collision', 'dt_month_collision', 'dt_time', 'cd_nis',
        'tx_rgn_collision_nl', 'tx_prov_collision_nl', 'tx_munty_collision_nl',
        'ms_x_coord', 'ms_y_coord', 'tx_crossway_nl', 'tx_weather_nl',
        'tx_road_condition_nl','tx_build_up_area_nl', 'tx_light_condition_nl',
        'cd_road_type_nl','tx_class_accidents_nl',
        'tx_road_usr_type1_nl', 'cd_road_usr_type2', 'tx_road_usr_type2_nl',
        'tx_collision_type_nl', 'tx_obstacles_nl',
    ];

    

}