<?php

namespace App\Console\Commands;

use File;
use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Foundation\Console\ModelMakeCommand;
use Str;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use function Laravel\Prompts\multiselect;

class CustomMakeModelCommand extends ModelMakeCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:model {name} {--factory} {--requests} {--api} {--pivot} {--seed} {--migration} {--controller} {--policy} {--resource} {--service} {--repository} {--morph-pivot} {--all} {--force}';

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
        parent::handle();
        if ($this->option('all')) {
                $this->createService();
                $this->createRepository();
        } else {
            if ($this->option('service')) {
                $this->createService();
            }
            if ($this->option('repository')) {
                $this->createRepository();
            }
        }
    }

    protected function createService()
    {
        $model = Str::studly($this->argument('name'));

        $this->call('make:service', [
            'service' => "{$model}Service",
            '--m' => $this->qualifyClass($this->getNameInput()),
        ]);
    }
    protected function createRepository()
    {
        $model = Str::studly($this->argument('name'));

        $this->call('make:repository', [
            'repository' => "{$model}Repository",
            '--m' => $this->qualifyClass($this->getNameInput()),
            '--s' => "{$model}Service",
        ]);
    }
    protected function getOptions()
    {
        return [
            ...parent::getOptions(),
            ['service', 'sr', InputOption::VALUE_NONE, 'Create a new service for the model'],
            ['repository', 'rp', InputOption::VALUE_NONE, 'Create a new repository for the model'],
        ];
    }

    protected function afterPromptingForMissingArguments(InputInterface $input, OutputInterface $output)
    {
        if ($this->isReservedName($this->getNameInput()) || $this->didReceiveOptions($input)) {
            return;
        }

        collect(multiselect('Would you like any of the following?', [
            'seed' => 'Database Seeder',
            'factory' => 'Factory',
            'requests' => 'Form Requests',
            'migration' => 'Migration',
            'policy' => 'Policy',
            'resource' => 'Resource Controller',
            'service' => 'Service',
            'repository' => 'Repository'
        ]))->each(fn($option) => $input->setOption($option, true));
    }
}
