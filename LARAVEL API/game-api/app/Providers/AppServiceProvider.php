<?php

namespace App\Providers;

use App\Http\Middleware\EnsureAdmin;
use App\Http\Middleware\HandleCors;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        $this->app['router']->aliasMiddleware('admin', EnsureAdmin::class);
        $this->app['router']->aliasMiddleware('cors', HandleCors::class);
    }
}
                