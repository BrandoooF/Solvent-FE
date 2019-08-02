import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-assessment-detail',
  templateUrl: './assessment-detail.component.html',
  styleUrls: ['./assessment-detail.component.css']
})
export class AssessmentDetailComponent implements OnInit {
  answers: any
  assessment: any
  answerObjects = []
  diagnosis: any
  assessmentId: number
  completedAssessment: any
  finalAssessment: any


  constructor(private route: ActivatedRoute, private assessmentService: AssessmentService) { }

  ngOnInit() {
    this.route.params.subscribe(
      val => {
        this.assessmentId = val['id']
        console.log(this.assessmentId)
        this.getAssessment()
      },
      err => console.log(err)
    )

  }

  getAssessment(){
    this.assessmentService.getAssessment(this.assessmentId).subscribe(
      res => {
        this.assessment = res
        console.log(this.assessment)
        this.finalAssessment = Object.assign({}, this.assessment)
      },
      err => console.log(err)
    )
  }

  logAnswers(){
    console.log(this.answers)
  }

  submitAssesment(){

    for(let i=0;i<this.answers.length;i++){
      //console.log(this.answers[i])

      let answerObj = {
        question: this.assessment.questions[i].id,
        assessment : this.assessment.id,
        answer : this.answers[i],
        /*patient : this.patientProvider.selectedPatient.id,*/
      }

      this.answerObjects.push(answerObj)
    }

    this.completedAssessment = {
      answers: this.answerObjects, 
      /*patient: this.patientProvider.selectedPatient.id,*/
      diagnosis: this.diagnosis['id']
    }

    //console.log(content.patient)

    /*this.assessmentProvider.submitAnswers(content).subscribe(
      res => {
        console.log(res)
        this.assessmentProvider.completedAssessments.push(this.assessment.id)
      },
      err => console.log(err)
    )*/
  }


}
