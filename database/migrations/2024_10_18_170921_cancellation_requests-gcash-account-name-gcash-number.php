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
        Schema::table('cancellation_requests', function (Blueprint $table) {
            //
            $table->string('gcash_account_name')->nullable();
            $table->string('gcash_number')->nullable();
            $table->boolean('refunded')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cancellation_requests', function (Blueprint $table) {
            $table->dropColumn(['gcash_account_name','gcash_number','refunded']);
        });
    }
};
