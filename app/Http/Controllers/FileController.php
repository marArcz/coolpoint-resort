<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    //
    public function __invoke(Request $request,string $folder, string $file)
    {
        if($request->user('admin') || $request->user('customer')) {
            return Storage::response($folder . '/' .$file);
        }else{
            return abort('403');
        }
    }
}
