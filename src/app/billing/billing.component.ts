import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  cardForm: FormGroup
  message: String

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  getToken(){
    (<any>window).Stripe.createToken({
      number : this.cardForm.get('number').value,
      exp_month: this.cardForm.get('expiry_month').value,
      exp_year: this.cardForm.get('expiry_year').value,
      cvc: this.cardForm.get('cvc').value,
    }).then(function(result) {
      console.log(result)
      //this.cardForm.get('token').setValue(response.card.id)
    });


    /*(<any>window).Stripe.card.create({
      number : this.cardForm.get('number'),
      exp_month: this.cardForm.get('expiry_month'),
      exp_year: this.cardForm.get('expiry_year'),
      cvc: this.cardForm.get('cvc'),
    }), (status: number, response: any) => {
      if (status === 200) {
        this.message = `Success! Card token`;
        this.cardForm.get('token').setValue(response.card.id)
      } else {
        this.message = response.error.message;
      }
    }*/
  }

  initForm(){
    this.cardForm = this.fb.group({
      number : ['', Validators.required],
      exp_month : ['', Validators.required],
      exp_year: ['', Validators.required],
      cvc : ['', Validators.required],
      token : ['', Validators.required]
    })
  }
}
