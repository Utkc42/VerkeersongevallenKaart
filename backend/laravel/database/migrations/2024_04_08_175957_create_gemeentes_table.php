<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGemeentesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gemeentes', function (Blueprint $table) {
    $table->id();
    $table->string('niscode')->unique();
    $table->string('name');
    $table->boolean('arrondissementcapital')->default(false);
    $table->boolean('provincecapital')->default(false);
    $table->boolean('regioncapital')->default(false);
    $table->boolean('countrycapital')->default(false);
    $table->json('geometry'); // Of een ander datatype afhankelijk van je DB en hoe je de coördinaten wilt opslaan
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gemeentes');
    }
}