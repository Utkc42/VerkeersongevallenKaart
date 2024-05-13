<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accident extends Model
{
    use HasFactory;

    protected $table = 'opendata'; 
    protected $primaryKey = 'id';  // Dit is standaard, dus alleen nodig als het anders is.
    public $timestamps = false;

    protected $fillable = [
        'id',
        'JAAR', 'MAAND', 'TIJD', 'NIS', 'REGIO', 'PROVINCIE', 'STAD',
        'XCORDINAAT', 'YCORDINAAT', 'KRUISPUNT', 'WEER', 'WEGCONDITIE',
        'BEBOUWINGSGEBIED', 'WEERLICH', 'WEGTYPE', 'VERKEERSSLACHTOFFERS',
        'VOERTUIGTYPE1', 'VOERTUIGTYPE2', 'BOTSINGTYPE', 'OBSTAKELS'
    ];
}