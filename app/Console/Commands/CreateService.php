<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class CreateService extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {service} {--m=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new service class';

    /**
     * Execute the console command.
     */
    private function replaces(): array
    {
        return [
            '{{class}}' => $this->argument('service'),
            '{{namespace}}' => "App\Services",
            "{{namespacedModel}}" => "App\Models\\" . $this->option("m")
        ];
    }
    public function handle()
    {
        $stub = file_get_contents('app/Console/Commands/stubs/service.stub');

        $stub = str_replace(
            array_keys($this->replaces()),
            array_values($this->replaces()),
            $stub
        );
        $fileName = 'app/Services/' . $this->argument('service').'.php';
        $file = fopen($fileName,'w');
        fwrite($file, $stub);
        fclose($file);

        return Command::SUCCESS;
    }
}
