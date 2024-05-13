<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccidentController;

// Route voor het ophalen van alle ongevallen met paginatie
Route::get('/accidents', [AccidentController::class, 'index']);

// Route voor het ophalen van unieke filterwaarden
Route::get('/filters', [AccidentController::class, 'getFilterData']);