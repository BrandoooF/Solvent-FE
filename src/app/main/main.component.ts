import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userData = {}
  

  constructor(private authservice: AuthService) { }

  ngOnInit() {
    this.getUser()
  }

  getUser(){
    this.userData = this.authservice.userData
  }

  
}
