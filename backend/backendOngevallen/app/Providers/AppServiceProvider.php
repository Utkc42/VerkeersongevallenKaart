<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Interfaces\IAccidentRepository;
use App\Repositories\AccidentRepository;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(IAccidentRepository::class, AccidentRepository::class);
    }
}