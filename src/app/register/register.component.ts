import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Form, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'
import { MessageService } from '../message.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  newUserData = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    password2: '',
    email: '',
    phone: '',
    location: '',
    occupation: '',

  }

  newProfileData = {
    username: '',
    phone : '',
    location: '',
    occupation: '',
  }
  response: any;
  message: any;

  constructor(private fb: FormBuilder, private authservice: AuthService) { }

  ngOnInit() {
    this.createForm()
  }

  createForm(){
    this.registerForm = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      username: ['', Validators.required],
      password: ['',Validators.required],
      password2: ['', Validators.required],
      email: ['',Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      occupation: ['',Validators.required],
      
    })
  }

  register(){
    //loads newUserData into object to be sent in post request to create new user
    this.newUserData.first_name = this.registerForm.get('first').value
    this.newUserData.last_name = this.registerForm.get('last').value
    this.newUserData.username = this.registerForm.get('username').value
    this.newUserData.password = this.registerForm.get('password').value
    this.newUserData.password2 = this.registerForm.get('password2').value
    this.newUserData.email = this.registerForm.get('email').value
    this.newUserData.phone = this.registerForm.get('phone').value
    this.newUserData.location = this.registerForm.get('location').value
    this.newUserData.occupation = this.registerForm.get('occupation').value

    
    if(this.newUserData.password === this.newUserData.password2){
      console.log('registered')
      console.log(this.newUserData)

      this.authservice.createUser(this.newUserData).subscribe(
        res => {          
          console.log(res)
          this.response = res
          this.message = this.response.msg
          this.authservice.displayMessage(this.message)
        },
        err => {
          console.log(err)
          this.authservice.displayMessage('An Error Occured, Try Again')
        })   
      
    }else{
      this.authservice.displayMessage('passwords do not match')
    }
  }

  /*updateProfile(){
    this.newProfileData.username = this.registerForm.get('username').value //send to know which user instance
    this.newProfileData.phone = this.registerForm.get('phone').value
    this.newProfileData.location = this.registerForm.get('location').value
    this.newProfileData.occupation = this.registerForm.get('occupation').value

    this.authservice.updateProfile(this.newProfileData).subscribe(
      res => {
        console.log(res)
        this.displayMessage('Thanks for joining! You may now log in')
      },
      err => {this.displayMessage('We could not update your profile, please try again')}
    
    )
    
  }*/

  displayMessage(msg){
    this.message = msg
    console.log(this.message)
        setTimeout(() =>{
          this.message = undefined}, 3000)
  }

}
