import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  constructor() {  }

  displayMessage(msg){
    console.log(msg)
    console.log(msg)
    setTimeout(() =>{
      msg = undefined}, 3000)
  }

}
