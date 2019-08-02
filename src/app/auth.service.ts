import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from 'selenium-webdriver/http';
import { Router } from '@angular/router';
import { API_URL } from '../environments/environment';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn = false;
  tokenURL = 'http://157.230.80.189/api/get_auth_token/' //  "http://localhost:8000/api/get_auth_token/"  //
  API_URL =  'http://157.230.80.189/' //"http://localhost:8000/"  //
  username: string
  password: string
  userData;//contains token, user ID (id), and profile ID (profile)
  userData1 = new BehaviorSubject(this.isLoggedIn)
  title = 'navi'
  message = new BehaviorSubject('none')

  //store the url so we can redirect after logging in
  redirectUrl: string;

  login(usr, pw){
    this.username = usr
    this.password = pw

    let body={
      username: usr,
      password: pw
    }
    console.log(body)
    
    let req = this.http.post(
      this.tokenURL,body,{
        headers:{
          Accept: "Application/json"
        }
    })

    req.subscribe((res) => {
      this.userData = res
      //console.log(res)
      this.isLoggedIn = true
      this.userData1.next(this.isLoggedIn)
      //console.log('next passed')        
        
    }, (err) => {
      console.log(err)
      if(err.status > 200){
        
      }
    
    })
    
    return req
  }

  logout(): void{
    this.isLoggedIn = false;

    //empty user data so views do not show (Doesn't Work!!!!)
    this.userData = []
    this.router.navigate(["/v"])
    console.log('logged out')
    console.log(this.userData)
  }

  //sends POST to create new user
  createUser(userData){
    return this.http.post(this.API_URL + "users/", userData, {
      headers:{
        Accept: "Application/json"
      }
    })
  }

  updateUser(userData){
    return this.http.patch(this.API_URL + "users/" + this.userData.id + "/", userData, {
      headers:{
        Accept: "Application/json"
      }
    })
  }

  //updates automatically created user profile after creating user
  updateProfile(profileData){
    //console.log(this.userData.profile)    
    
      return this.http.patch(this.API_URL + "profiles/" + this.userData.profile + "/", profileData, {
        headers:{
          Accept: "Application/json"
        }
      })
    
  }

  //gets returns userData - token, user ID (id), and profile ID (profile)
  getUserData(){
    return new BehaviorSubject(this.userData)
  }

  displayMessage(msg){
    this.message.next(msg)
    //console.log(this.message.value)
        setTimeout(() =>{
          this.message.next('none')}, 3000)
  }


}
