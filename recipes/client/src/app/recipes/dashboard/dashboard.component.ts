import { Component, OnInit } from '@angular/core';
import { User } from "./../../user-login/user";
import { Router } from "@angular/router";
import { DbService } from './../../db.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    users : Array<User>;
    item; 
    message;
    user_recipes : Array<any>

    constructor(private db_service : DbService, private router: Router) { }

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

        this.db_service.get_users()
        .then(users => this.users = users)
        .catch(err => console.log("get all the users error", err))
    }

    save_user_item(own_recipes){
        this.db_service.save_user_item(own_recipes)
        .then((data) => {
            if(data.message){
                this.message = data.message
            }else{
                this.message = "Added to your Recipe Book"
                console.log("sccuessfull saved user.item")
                this.ngOnInit()
              }
           setTimeout(()=> this.message=" ", 2000)
        })
        .catch(err => console.log("save user item.recipe error", err))
        }
    }


