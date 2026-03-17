<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Spatie\Permission\Models\Role;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
         Role::create(['name' => 'admin', 'guard_name' => 'api']);
    }

    /** @test */
    public function un_admin_peut_creer_une_categorie()
    {
         $admin = User::factory()->create();
        $admin->assignRole('admin');

         $response = $this->actingAs($admin, 'api')->postJson('/api/categories', [
            'name' => 'Huiles Essentielles',
            'description' => 'Toutes nos huiles bio'
        ]);

         $response->assertStatus(201);
        $this->assertDatabaseHas('categories', ['name' => 'Huiles Essentielles']);
    }

    /** @test */
    public function un_client_ne_peut_pas_creer_de_categorie()
    {
        $user = User::factory()->create();  

        $response = $this->actingAs($user, 'api')->postJson('/api/categories', [
            'name' => 'Tentative Hack',
            'description' => 'No access'
        ]);
 
        $response->assertStatus(403); 
    }

    /** @test */
    public function la_validation_du_nom_est_requise()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');

        $response = $this->actingAs($admin, 'api')->postJson('/api/categories', [
            'name' => '', 
            'description' => 'Test'
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['name']);
    }
}