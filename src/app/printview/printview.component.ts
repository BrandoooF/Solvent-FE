import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, transition, animate, style, keyframes } from '@angular/animations'
import { AuthService } from '../auth.service';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-printview',
  templateUrl: './printview.component.html',
  styleUrls: ['./printview.component.css'],
  animations: [
    [
      trigger('printState',[
        state('collapsed', style({
          
        })),
        state('expanded', style({
          position: 'absolute',
          top: '-130px',
          left: 0,
          background: 'white',
          minHeight: '100vh',
          minWidth: '99vw',
          zIndex: 40
        })),
      ])
    ]
  ]
})
export class PrintviewComponent implements OnInit {
  @Input() finalList;
  @Input() viewState;
  printPane: boolean;

  constructor(private authservice: AuthService, private dataservice: DataserviceService) { }

  ngOnInit() {
    //subscribe to print pane behavior subject
    this.dataservice.printPane.subscribe(
      (x) => this.printPane = x
    )
    console.log(this.finalList)
  }

  changeViewState(){
    if(this.viewState.printView == 'collapsed'){
      this.authservice.displayMessage('Print View activated - click "Print View" button in upper left corner to close')
      this.viewState.printView = 'expanded'   
    }else{
      this.viewState.printView = 'collapsed'
      this.authservice.displayMessage('Print View closed')
    }
    console.log(this.viewState)
  }

  togglePrintView(){
    //toggle print view from behavior subject in masterpane component
    if(this.printPane == true){
      //close pane if true
      this.dataservice.printPane.next(false)
    }

    this.viewState.printView = 'collapsed'
    this.authservice.displayMessage('Print View closed')
  }

}
