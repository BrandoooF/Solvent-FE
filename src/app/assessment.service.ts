import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AssessmentService {
  API_URL = this.auth.API_URL

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getAssessments(){
    return this.http.get(this.API_URL + 'api/assessments/')
  }

  getAssessment(id: number){
    return this.http.get(this.API_URL + `api/assessments/${id}`)
  }

  submitAnswers(content){
    return this.http.post(this.API_URL + `api/questions/`, content)
  }

}
