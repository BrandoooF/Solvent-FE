import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class PaymentServiceService {

  httpOptions = {
    headers : new HttpHeaders ({
      Accept: "application/json",
    })
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  sendPaymentToken(stripeToken){
    return this.http.post(
      this.authService.API_URL + 'api/create_customer/', 
      {stripeToken : stripeToken},
      this.httpOptions
    )
  }
}
