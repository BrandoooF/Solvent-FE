import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private authservice: AuthService, private dataservice: DataserviceService, private router: Router) { }
  user;
  profile;
  icon;

  ngOnInit() {
    this.getUser()
    this.getProfile()
  }

  getUser(){
    this.dataservice.getUser().subscribe( user =>{
      this.user = user;

      this.displayIcon()
    })
  }

  getProfile(){
    this.dataservice.getProfile().subscribe( profile =>{
      this.profile = profile;

      console.log(profile)
      console.log('hello')
    })
  }

  logout(){
    this.authservice.logout()
    this.router.navigate(['/login'])
  }

  displayIcon(){
    //takes first character from username and creates icon
    this.icon = this.user.username.charAt(0).toUpperCase()
  }




}
