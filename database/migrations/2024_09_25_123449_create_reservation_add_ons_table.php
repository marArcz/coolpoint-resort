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
        Schema::create('reservation_add_ons', function (Blueprint $table) {
            $table->id();
            $table->string('amenity');
            $table->integer('quantity')->default(1);
            $table->bigInteger('price');
            $table->foreignId('amenity_id')->nullable()->references('id')->on('extra_amenities')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation_add_ons');
    }
};
