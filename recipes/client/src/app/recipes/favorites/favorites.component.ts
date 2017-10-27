import { Component, OnInit } from '@angular/core';
import { User } from "./../../user-login/user";
import { Router } from "@angular/router";
import { DbService } from './../../db.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent implements OnInit {
  	recipes: Array<any>;
  	user : Array<User>;
  	favorites : Array<any>
    items: Array<any>
    item; 
    message;
    user_recipes : Array<any>
	

    constructor(private db_service : DbService, private router: Router) { }

    toggleForm(){
      $("#form1").slideToggle()
    }

    showRecipe(event){
        console.dir()
        console.log("showrecipe button")
        $(event.target.parentNode.nextElementSibling).slideToggle()
    }

    ngOnInit() {
        this.item = {food_title: "" , image_url:"", ingredients: "", instructions:""}

        this.db_service.check()
        .then(user => console.log(user))
        .catch(() => this.router.navigate(["/login"]))

        this.db_service.user_favorites()
        .then(data => this.favorites = data)
        .catch(err => console.log("Get all favorite errors, componments ts", err))

        this.db_service.user_recipes()
        .then(user_recipes_data => this.items = user_recipes_data)
        .catch(err => console.log("Get all user_recipes errors, componments ts", err))
     }

    destroy(recipe_id){
        console.log("destroy function", recipe_id)    
        this.db_service.destroy(recipe_id)
        .then(() => {
            console.log("successfully deleted item")
            this.ngOnInit()
        })
        .catch(err => console.log("Error", err))
    }

    erase(item_id){
        console.log("erase function", item_id)    
        this.db_service.erase(item_id)
        .then(() => {
            console.log("successfully erase item")
            this.ngOnInit()
         })
        .catch(err => console.log("Error", err))
    }

    addRecipe(){
        console.log("addRecipe function")
        console.log(this.item)
        this.db_service.addRecipe(this.item)
        .then((data) => {
            this.user_recipes = data.user_recipe
            console.log("successful added user Recipe")
            this.item =" "})
        .catch(err => console.log("adding user recipe fail", err))
    }

}


