<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        // n-jibo l-produits m3a tsawer dyalhom
        return response()->json(Product::with('images')->get());
    }

    public function store(StoreProductRequest $request)
    {
         if ($request->hasFile('images')) {
            $images = $request->file('images');
            if (count($images) > 4) {
                return response()->json([
                    'message' => 'Limite de 4 images par produit dépassée'
                ], 422);
            }
        }

        $data = $request->validated();
         $product = Product::create($data);

         if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                 $path = $image->store('images/products', 'public');
               
                $product->images()->create(['image_url' => $path]);
            }
        }
 
        return response()->json($product->load('images'), 201);
    }

    public function show(Product $product)
    {
         return response()->json($product->load('images'));
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();
        $product->update($data);
        return response()->json($product);
    }

    public function destroy(Product $product)
    { 
        $product->delete();
        return response()->json(['message' => 'Produit supprimé avec succès','product' => $product], 200);
    }
}