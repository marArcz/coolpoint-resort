<?php

namespace App\Console\Commands;

use Artisan;
use Illuminate\Console\Command;

class CreateModule extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:module {--model=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $model = $this->option('model');
        $serviceName = $model . "Service";
        $repositoryName = $model . "Repository";

        Artisan::call('make:service', [
            'service' => $serviceName,
            '--m' => $model,
        ]);
        Artisan::call('make:repository', [
            'repository' => $repositoryName,
            '--m' => $model,
            '--s' => $serviceName
        ]);
    }
}
