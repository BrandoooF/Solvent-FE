import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataserviceService {
  API_URL = 'http://157.230.80.189/' // 'http://127.0.0.1:8000/' //
  userProfileId;
  viewState;
  userData: any = {}
  userId;
  printPane = new BehaviorSubject(false)
  finalList = new BehaviorSubject([])
  finalPrint = new BehaviorSubject('collapsed')

  constructor(private http: HttpClient, private authService: AuthService) { }  

    httpOptions = {
      headers : new HttpHeaders ({
        Accept: "application/json",
        Authorization: "Token " + this.authService.userData.token
      })
    }
    
  getData(){
    return this.http.get(this.API_URL + "users/", {
      headers:{
        Accept: "Application/json",
        Authorization: "Token " + this.authService.userData.token
      }})
    
  }

  getDiagnoses(){
    return this.http.get(this.API_URL + 'api/diagnoses/', this.httpOptions)
  }

  getUser(){  
    if(this.authService.userData.id){
      this.userId = this.authService.userData.id
      return this.http.get(this.API_URL + 'api/users/' + this.userId, this.httpOptions)
    }
  }

  getProfile(){
    this.userProfileId = this.authService.userData.profile
    return this.http.get(this.API_URL + 'api/profiles/' + this.userProfileId, this.httpOptions)
  }

  sendContactRequest(body){
    return this.http.post(this.API_URL + `api/messages-to-admin/`, body, this.httpOptions)
  }
}
