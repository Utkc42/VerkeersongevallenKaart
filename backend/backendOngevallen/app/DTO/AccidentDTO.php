<?php
namespace App\DTO;

class AccidentDTO {
    public $id;
    public $jaar;
    public $maand;
    public $tijd;
    public $nis;
    public $regio;
    public $provincie;
    public $stad;
    public $kruispunt;
    public $bebouwingsgebied;
    public $longitude;
    public $latitude;

    public function __construct($id, $jaar, $maand, $tijd, $nis, $regio, $provincie, $stad, $kruispunt, $bebouwingsgebied, $longitude, $latitude) {
        $this->id = $id;
        $this->jaar = $jaar;
        $this->maand = $maand;
        $this->tijd = $tijd;
        $this->nis = $nis;
        $this->regio = $regio;
        $this->provincie = $provincie;
        $this->stad = $stad;
        $this->kruispunt = $kruispunt;
        $this->bebouwingsgebied = $bebouwingsgebied;
        $this->longitude = $longitude;
        $this->latitude = $latitude;
    }
}