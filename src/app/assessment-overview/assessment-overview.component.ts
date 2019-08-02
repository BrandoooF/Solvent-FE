import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-assessment-overview',
  templateUrl: './assessment-overview.component.html',
  styleUrls: ['./assessment-overview.component.css']
})
export class AssessmentOverviewComponent implements OnInit {
  @Input() assessments
  @Output() toggleEvent = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit() {
  }

  togglePrint(){
    this.toggleEvent.emit(false)
  }

}
