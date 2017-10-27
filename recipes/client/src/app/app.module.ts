import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';
import { DbService } from './db.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterPipe } from './filter.pipe';
import { RecipesComponent } from './recipes/recipes.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { FavoritesComponent } from './recipes/favorites/favorites.component';
import { DashboardComponent } from './recipes/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    RecipesComponent,
    UserLoginComponent,
    FavoritesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule 
  ],
  providers: [DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
