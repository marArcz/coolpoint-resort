<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateRepository extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {repository} {--s=} {--m=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */

    private function replaces(): array
    {
        return [
            '{{class}}' => $this->argument('repository'),
            '{{model}}' => $this->option('m'),
            '{{namespace}}' => "App\Services",
            "{{namespacedService}}" => "App\Services\\" . $this->option("s"),
            '{{serviceClass}}' => $this->option('s'),
            '{{serviceVariable}}' => lcfirst($this->option('s')),
        ];
    }
    public function handle()
    {
        // if (mkdir('app/Repositories',0755,true)) {
        $stub = file_get_contents('app/Console/Commands/stubs/repository.stub');

        $stub = str_replace(
            array_keys($this->replaces()),
            array_values($this->replaces()),
            $stub
        );
        $fileName = 'app/Repositories/' . $this->argument('repository') . '.php';
        $file = fopen($fileName, 'w');
        fwrite($file, $stub);
        fclose($file);
        // }
    }
}
