import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DbService } from './../db.service';
import { User } from "./../user-login/user";
declare var jquery:any;
declare var $ :any;

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
	dishes;
	recipes: Array<any>
	user : Array<User>
	message;


constructor(private db_service : DbService, private router: Router) { }
	switch: boolean = true;

	myFunction(){
		$("span").hide("slow")
	}

	ngOnInit() {
    
		this.dishes = " "; 

		this.db_service.check()
		.then(user => console.log(user))
		.catch(() => this.router.navigate(["/login"]))	
	}

	getRecipes(){
		console.log("getRecipes function")
		this.db_service.getRecipe(this.dishes)
		.then(recipes => {
			this.recipes = recipes.recipes;
			this.dishes= " ";
		})
		.catch(err => console.log("getRecipes errors", err))
		}

	saveRecipe(recipe){
		console.log("save recipe function", recipe)
		this.db_service.saveRecipe(recipe)
		.then((data) => {
			if(data.message){
				this.message = data.message
				console.log("Successfully save recipe")
			}else{
				this.message = "Added to your Recipe Book"
				console.log("Already added to your recipe book")
			}
			setTimeout(()=> this.message=" ", 2000)
		})
		.catch(err => console.log("saveRecipe errors", err))
	}
}
