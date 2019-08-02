import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  
})
export class DetailComponent implements OnInit {
  @Input() diagnoses;
  @Input() finalList;
  @Input() viewState;
  //@Input() selectedInterventions;
  customIntervention = "";
  
  selectedInterventions: any = [];

  constructor() { }

  ngOnInit() {
    
  }

  addIntervention(intervention){
    this.checkinterventions(intervention)
    this.addToSelected(intervention)
  }
  
  checkinterventions(intervention){
    if(this.selectedInterventions.indexOf(intervention) == -1){
      this.selectedInterventions.push(intervention)
      return null
    }else{
      this.selectedInterventions.splice(this.selectedInterventions.indexOf(intervention),1)
      return intervention
    }

  }

  addToSelected(intervention){
    for(let i=0;i<this.finalList.length; i++){
      if(this.finalList[i].interventions.indexOf(intervention) != -1){
        if(this.finalList[i].selected.indexOf(intervention) == -1){
          this.finalList[i].selected.push(intervention)
        }else{
          this.finalList[i].selected.splice(this.finalList[i].selected.indexOf(intervention),1)
        }
      }else{
        
      }
    }
  }

  selectAll(diagnosis){
      let id = diagnosis.id
      let item = this.finalList.filter(diag => diag == diag)
      let d = item[0]
      for(let i=0;i<d.interventions.length;i++){
        if(d.selected.indexOf(d.interventions[i]) == -1){
          //if intervention is NOT in selected array for intervention, push it in
          d.selected.push(d.interventions[i])
          //now check if the intervention is in selectedInterventions array, If it is NOT push it in
          if(this.selectedInterventions.indexOf(d.interventions[i]) == -1){
            this.selectedInterventions.push(d.interventions[i])
          }
            
        }        
      }        
  }

  deselectAll(diagnosis){
    let id = diagnosis.id
      let item = this.finalList.filter(diag => diag.id == id)
      let d = item[0]
      for(let i=0;i<d.interventions.length;i++){        
          d.selected.splice(d.selected.indexOf(d.selected[i]),1)
          d.selected = []
          this.selectedInterventions.splice(this.selectedInterventions.indexOf(d.interventions[i]),1)        
        //console.log(this.selectedInterventions)        
      }        
  }

  addCustom(diagnosis, inputValue){
    let id = diagnosis.id
    let item = this.finalList.filter(diag => diag.id == id)
    let d = item[0]
    let inter = {name: ''}
    inter.name = inputValue
    d.selected.push(inter)
    d.interventions.push(inter)
    this.selectedInterventions.push(inter)
    //console.log(inputValue)
  }

  removeDiagnosis(){}

}
