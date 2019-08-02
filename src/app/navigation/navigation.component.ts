import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';

//To-do: Figure out why ChangeDetectorRef is always undefined. 
//need ChangeDetector ref to update view after behaviorSubject (in auth service) is updated


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  
})
export class NavigationComponent implements OnInit {
  message: any;  
  viewState;
  isLoggedIn = false //causes Dataservice error in console but cannot be removed or user info will not show in user component
  constructor(private ref:ChangeDetectorRef, private authservice: AuthService ) { }

  ngOnInit() {     
    this.getUserData()
    this.ref.detectChanges()
    this.getMessages()
  }

  getUserData(){
      var subscription = this.authservice.userData1.subscribe(
        (x) => {
            console.log('Next: ' + x);
            this.isLoggedIn = x
            console.log('this.isLoggedIn: ' + this.isLoggedIn)            
            
        },
        (err) => {
            console.log('Error: ' + err);
        },
        () => {
            console.log('Completed');
        });
  }

  getMessages(){
    this.authservice.message.subscribe(
      (next) => {
          this.message = next
      },
      (err) => {
        console.log(err)
      }
    )
  }

  displayMessage(msg){
    this.message = msg
    console.log(this.message)
        setTimeout(() =>{
          this.message = undefined}, 3000)
  }

  

  

}
