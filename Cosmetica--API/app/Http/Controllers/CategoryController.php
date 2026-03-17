<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return response()->json(Category::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        //
        Gate::authorize('create', Category::class);
        $data = $request->validated();
        $category = Category::create($data);
        return response()->json(["message" => "Category created successfully", $category]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        // 
        
        return response()->json($category);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
        Gate::authorize('update', Category::class);
        $data = $request->validated();
        $category->update($data);
        $category->update($data);
        return response()->json(["message" => "Category updated successfully", '$category' => $category],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
        Gate::authorize('update', Category::class);
        $category->delete();
        return response()->json(["message" => "Category deleted successfully"],200);
         
    }
}
