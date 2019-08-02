import { Component, OnInit } from '@angular/core';
import { PaymentServiceService } from '../payment-service.service';

@Component({
  selector: 'app-card-checkout',
  templateUrl: './card-checkout.component.html',
  styleUrls: ['./card-checkout.component.css']
})
export class CardCheckoutComponent implements OnInit {

  constructor(
    private paymentService: PaymentServiceService
  ) { }

  ngOnInit() {
  }

  openCheckout(){
    let self = this
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_j5Hx1od6UYj29FkasbEyHSaU00R4OQoK0u',
      locale: 'auto',
      token: function (token: any){
        console.log(self)
        //Todo get access token and send to server
        self.paymentService.sendPaymentToken(token).subscribe(
          res => console.log(res),
          err => console.log(err)
        )
      }.bind(this)
    });

    handler.open({
      name: 'Solvent Co. LLC',
      description: 'July subscription charge',
      amount: 2000
    })
  }

}
