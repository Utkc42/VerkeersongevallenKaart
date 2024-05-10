<?php
namespace App\DTO;

class AccidentDTO {
public $jaar;
public $maand;
public $tijd;
public $nis;
public $regio;
public $provincie;
public $stad;

public function __construct($jaar, $maand, $tijd, $nis, $regio, $provincie, $stad) {
$this->jaar = $jaar;
$this->maand = $maand;
$this->tijd = $tijd;
$this->nis = $nis;
$this->regio = $regio;
$this->provincie = $provincie;
$this->stad = $stad;
}
}