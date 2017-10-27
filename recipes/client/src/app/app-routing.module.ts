import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { FavoritesComponent } from './recipes/favorites/favorites.component';
import { DashboardComponent } from './recipes/dashboard/dashboard.component';



const routes: Routes = [


{path: 'login', component: UserLoginComponent },
{path: 'recipes', component: RecipesComponent },
{path: 'favorites', component: FavoritesComponent },
{path: 'dashboard', component: DashboardComponent },
{path: '**', redirectTo: "/login" },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
