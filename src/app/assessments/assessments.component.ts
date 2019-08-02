import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../assessment.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css']
})
export class AssessmentsComponent implements OnInit {
  assessments: any = []
  selectedAssessment: any
  selectedAssessments = []
  completedAssessments = []
  printOpen = false

  constructor(private assessmentService: AssessmentService, private router: Router) { }

  ngOnInit() {
    this.getAssessments()

  }

  getAssessments(){
    this.assessmentService.getAssessments().subscribe(
      res => this.assessments = res,
      err => console.log(err)
    )
  }

  assessmentClicked(assessment){
    if(this.selectedAssessments.indexOf(assessment) == -1){
      this.selectedAssessment = assessment
      assessment.answers = []
      assessment.additionalNotes = ''
      this.selectedAssessments.push(assessment)
    }else{
      this.selectedAssessment = assessment
      this.selectedAssessments.splice(this.selectedAssessments.indexOf(assessment), 1)
    }
    
  }  

  goToAssessment(assessment){
    console.log(assessment)
    this.router.navigate(['assessment', assessment.id]) 
  }

  saveAssessment(assessment){
    console.log(assessment)
    if(this.completedAssessments.indexOf(assessment) == -1){
      this.completedAssessments.push(assessment)
    }
  }

  togglePrint(event){
    this.printOpen = this.printOpen == false ? true : false
  }

  /*goToCompletedAssessment(assessment){
    this.navCtrl.push(CompletedAssessmentPage, {assessment: assessment})
  } */


}
