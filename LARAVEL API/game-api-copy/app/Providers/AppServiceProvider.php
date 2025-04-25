<?php

namespace App\Providers;

use App\Http\Middleware\CheckUserBlocked;
use App\Http\Middleware\EnsureAdmin;
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
    public function boot(): void
    {
      $this->app['router']->aliasMiddleware('admin', EnsureAdmin::class);

      $this->app['router']->aliasMiddleware('check.user', CheckUserBlocked::class);
    }
}
