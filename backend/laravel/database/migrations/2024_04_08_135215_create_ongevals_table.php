<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOngevalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ongevallen', function (Blueprint $table) {
    $table->id();
    $table->year('dt_year_collision'); // Jaar van de botsing
    $table->tinyInteger('dt_month_collision'); // Maand van de botsing
    $table->time('dt_time'); // Tijdstip van de botsing
    $table->string('cd_nis'); // NIS-code
    $table->string('tx_rgn_collision_nl'); // Regio van de botsing in het Nederlands
    $table->string('tx_prov_collision_nl')->nullable(); // Provincie van de botsing in het Nederlands
    $table->string('tx_munty_collision_nl'); // Gemeente van de botsing in het Nederlands
    $table->double('ms_x_coord', 15, 8)->nullable();
    $table->double('ms_y_coord', 15, 8)->nullable(); // Y-coördinaat
    $table->string('tx_crossway_nl'); // Kruispunt in het Nederlands
    $table->string('tx_weather_nl'); // Weer in het Nederlands
    $table->string('tx_road_condition_nl'); // Wegconditie in het Nederlands
    $table->string('tx_build_up_area_nl'); // Bebouwd gebied in het Nederlands
    $table->string('tx_light_condition_nl'); // Lichtconditie in het Nederlands
    $table->string('cd_road_type_nl'); // Wegtype in het Nederlands
    $table->string('tx_class_accidents_nl'); // Ongevalclassificatie in het Nederlands
    $table->string('tx_road_usr_type1_nl'); // Type weggebruiker 1 in het Nederlands
    $table->string('tx_road_usr_type2_nl')->nullable(); // Type weggebruiker 2 in het Nederlands
    $table->string('tx_collision_type_nl'); // Botsingtype in het Nederlands
    $table->string('tx_obstacles_nl')->nullable(); // Obstakel in het Nederlands
    $table->timestamps(); // Standaard Laravel timestamps
});

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ongevals');
    }
}