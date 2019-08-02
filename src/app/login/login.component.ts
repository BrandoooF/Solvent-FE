import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Form, Validators } from '@angular/forms';

import { AuthService } from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  username: string;
  password: string;
  message: any;
  m: any;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.createForm()
  }

  createForm(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })    
  }

  tryLogin(){    
    this.username = this.loginForm.get('username').value
    this.password = this.loginForm.get('password').value
    
    this.authService.login(this.username, this.password).subscribe(data =>{
      console.log(data)
      this.message = data
      this.m = data
      this.message = this.m.msg
      this.authService.displayMessage(this.message)
      this.goToApp()
      },
      (err) => {this.authService.displayMessage('Incorrect Username or Password')}
    )
  }

  displayMessage(msg){
    this.message = msg
    console.log(this.message)
        setTimeout(() =>{
          this.message = undefined}, 3000)
  }

  goToApp(){
    this.router.navigate(['dashboard'])
  }


}
