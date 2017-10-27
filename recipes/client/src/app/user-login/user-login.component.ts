import { Component, OnInit } from '@angular/core';
import { User } from "./user"
import { DbService } from './../db.service';
import { Router } from "@angular/router"


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
	new_user : User 
	user : User


  constructor(private db_service : DbService, private router: Router) { }

  ngOnInit() {
  	this.new_user = new User

  }

  login(){
  	this.db_service.login(this.new_user)
  		.then((data) => {
        console.log(data)
        this.db_service.setUser(data);
        this.router.navigate(['recipes'])}) 
		.catch(err => console.log("user login error", err))
  }
}
