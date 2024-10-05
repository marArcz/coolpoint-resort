<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservation_configurations', function (Blueprint $table) {
            $table->id();
            $table->string('gcash_qr_code')->default('');
            $table->string('gcash_account_no')->default('');
            $table->string('gcash_account_name')->default('');
            $table->bigInteger('resort_rate');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation_configurations');
    }
};
