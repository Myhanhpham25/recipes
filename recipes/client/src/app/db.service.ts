import { Injectable } from '@angular/core';
import { Http } from "@angular/http"
import "rxjs/add/operator/map"
import "rxjs"
import { User } from "./user-login/user"

@Injectable()
export class DbService {
	showUsername;

	constructor(private http: Http) { }

	getRecipe(recipes){
		return this.http.get(`http://food2fork.com/api/search?key=5617b7ee3cfdc597b6bd39827be71446&q=${recipes}`).map(data => data.json()).toPromise()
	}

	login(new_user : User ){
		// console.log(new_user)
		return this.http.post('/login', new_user).map(data => data.json()).toPromise()
	}

	setUser(data){ //set data so we can use it on other pages 
		// console.log(data)
		this.showUsername = data.username
	}

	saveRecipe(recipe){
		// console.log("service.ts", recipe)
			return this.http.post("/favorites", recipe).map(data => data.json()).toPromise()
	}

	user_favorites(){
		return this.http.get("/user_favorites").map(data => data.json()).toPromise()
	}

	get_users(){
		return this.http.get("/get_users").map(data => data.json()).toPromise()
	}

	destroy(recipe_id){
		return this.http.post("/destroy", {recipe_id:recipe_id}).map(data => data.json()).toPromise()
	}

	addRecipe(item){
		// console.log("addrecipe service")
		return this.http.post("/addRecipe", item).map(data => data.json()).toPromise()
	}

	user_recipes(){
		return this.http.get("/user_recipes").map(data => data.json()).toPromise()
	}

	erase(item_id){
		// console.log("erase service.ts")
		return this.http.post("/erase", {_id:item_id}).map(data => data.json()).toPromise()

	}

	save_user_item(own_recipes){
		console.log("save_user_item service.ts")
		return this.http.post("/save_user_item", own_recipes).map(data => data.json()).toPromise()
	}

	check(){
    	return this.http.get("/check").map(data => data.json()).toPromise()
  }


}
