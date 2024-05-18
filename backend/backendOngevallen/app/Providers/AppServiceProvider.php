<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Interfaces\IAccidentRepository;
use App\Repositories\AccidentRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
    * Bootstrap any application services.
    *
    * @return void
    */
   public function boot()
   {
       // Verhoog de geheugenlimiet
       ini_set('memory_limit', '512M');
   }
    public function register()
    {
        $this->app->bind(IAccidentRepository::class, AccidentRepository::class);
    }

}