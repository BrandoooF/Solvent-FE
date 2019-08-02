import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-print-final',
  templateUrl: './print-final.component.html',
  styleUrls: ['./print-final.component.css']
})
export class PrintFinalComponent implements OnInit {
  finalList:any = []
  printState = 'collapsed'

  constructor(private dataservice: DataserviceService) { }

  ngOnInit() {
    this.finalList = this.dataservice.finalList.subscribe(
      (x) => {this.finalList = x}
    )
  }

  toggle(){
    this.dataservice.finalPrint.next('collapsed')
    console.log('print final id ' + this.printState)
  }

  printReady(){
    window.print()
  }

}
