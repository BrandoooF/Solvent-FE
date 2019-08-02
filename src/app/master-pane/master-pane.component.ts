import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DataserviceService } from '../dataservice.service';
import { AuthService } from '../auth.service'
import { map } from 'rxjs/operators';
import { trigger, state, transition, animate, style, keyframes } from '@angular/animations'


@Component({
  selector: 'app-master-pane',
  templateUrl: './master-pane.component.html',
  styleUrls: ['./master-pane.component.css'],
  animations: [
    [
      trigger('printState',[
        state('collapsed', style({
          width: '25%',
          transform: 'scaleY(1)'
        })),
        state('expanded', style({
          width: '0px',
          minWidth: '0px',
          position: 'absolute',
          transform: 'scaleY(0%)'
        })),
      ]),      
    ],
    [
      trigger('masterState',[
        state('true', style({
          transform: 'translateX(0)'
        })),
        state('false', style({
          transform: 'translateX(-110%)'
        })),
        transition('true => false', animate('200ms ease-in')),
        transition('false => true', animate('200ms ease-out'))
      ])
    ],
    [
      trigger('printerState',[
        state('true', style({
          transform: 'translateX(0)'
        })),
        state('false', style({
          transform: 'translateX(110%)'
        })),
        transition('true => false', animate('200ms ease-in')),
        transition('false => true', animate('200ms ease-out'))
      ])
    ],
    [
      trigger('finalPrintState',[
        state('collapsed', style({
          transform: 'translateY(100%)',
          background: 'white'
        })),
        state('expanded', style({
          transform: 'translateY(0%)',
          background: 'white'
        })),
        transition('collapsed <=> expanded', animate('400ms ease-in')),
        //transition('false => true', animate('400ms ease-out'))
      ])
    ]
  ]
})
export class MasterPaneComponent implements OnInit {
  user;
  diagnoses: any = []
  selectedDiagnoses: any = []
  finalList = []
  customIntervention = "";  
  selectedInterventions: any = [];
  userData = {}
  viewState = {
    printView: 'collapsed'
  }
  searchText;
  masterPane = false
  printPane: boolean;
  finalPrint; //for large print pane in desktop

  largeFont = false; //for large font preference;
  nightMode = false; //for night mode preference;
  

  constructor(
    private dataservice: DataserviceService, 
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData()
    this.getDiagnoses()
    //subscribe to printPane behaviorsubject
    this.dataservice.printPane.subscribe(
      (x) => this.printPane = x
    )

    this.dataservice.finalPrint.subscribe(
      (x) => {this.finalPrint = x}
    )
  }

  getData(){
    this.dataservice.getData().subscribe(
     // user => console.log(user)
    )
  }

  getDiagnoses(){
    this.dataservice.getDiagnoses().subscribe(
      diagnoses => this.diagnoses = diagnoses
    )
  }

  addDiagnosis(id){
    let selectedDiagnosis = this.diagnoses.filter(d => d.id==id)
    let sd = selectedDiagnosis[0]
    let pos = this.selectedDiagnoses.indexOf(sd)
    let sdClone = Object.assign({}, sd) //clone object for finalList array
    sdClone.selected = [] //create selected array within clone
    
    if(pos == -1){
      this.selectedDiagnoses.push(sd) 
      //clone object to set selected array without messing up type
      this.finalList.push(sdClone) //push clone into finalList array
    }else{
      this.selectedDiagnoses.splice(pos, 1)
      //let clone = this.finalList.filter(d => d.id = id)
      //let obj = clone[0];
      sdClone.selected = []
      this.finalList.splice(this.finalList.indexOf(sdClone), 1)
    }
  }

  passViewState(){
    this.dataservice.viewState = this.viewState;
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
      let item = this.finalList.filter(diag => diag.id == id)
      let d = item[0]
      for(let i=0;i<d.interventions.length;i++){
        if(d.selected.indexOf(d.interventions[i]) == -1){
          //if intervention is NOT in selected array for intervention, push it in
          d.selected.push(d.interventions[i])
          console.log('target')
          console.log(d)
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

  reset(){
    this.selectedDiagnoses = []
    this.selectedInterventions = []
    this.finalList = []
    console.log('reset')
    this.authservice.displayMessage('All Items Reset')
  }

  toggleMaster(){
    if(this.masterPane == true){
      this.masterPane = false
    }else{
      this.masterPane = true
    }    
  }

  togglePrint(){
    console.log('printran') 
    if(this.dataservice.printPane.value == true){
      this.dataservice.printPane.next(false)           
    }else{
      this.dataservice.printPane.next(true)
      
    }    
  }

  printReady(){
    console.log(this.finalList)
    let fl = this.finalList.concat()
    this.dataservice.finalList.next(fl)
    this.dataservice.finalPrint.next('expanded')
    
    //setTimeout(()=>{window.print()}, 700)
  }

  goToContact(){
    this.router.navigate(['contact'])
  }

  goToBilling(){
    this.router.navigate(['billing'])
  }

  fontToggle(){
    this.largeFont = this.largeFont == false ? true : false;
    console.log(this.largeFont)
  }

  nightModeToggle(){
    this.nightMode = this.nightMode == false ? true : false;
    console.log(this.nightMode)
  }

  inBeta(){
    alert('This feature not available yet');
  }

  sortByName(){
    this.diagnoses = this.diagnoses.sort(compare);

    function compare(a: any, b: any): Number{
      let comparison = 0;
      
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()

      if(nameA > nameB){
        comparison = 1;
      }else{
        comparison = -1;
      }

      return comparison
    }
  }

  sortById(){

  }

  openAddCode(ev){
    let el = (ev.target as Element);
    let addBox = el.closest(".diagnosis-detail").getElementsByClassName("add-code")[0]
    
    if(!addBox.classList.contains("open")){
      addBox.classList.add('open')
    }else{
      addBox.classList.remove('open')
    }    
  }

  closeAddCode(ev){
    let el = (ev.target as Element);
    let addBox = el.closest(".add-code")

    if(addBox.classList.contains("open")){
      addBox.classList.remove('open')
    }
  }

  addCodesToList(ev, diagnosis, value){
    let codes = value
    //console.log(codes)
    let code_arr = codes.split(",")
    //console.log(code_arr)
    diagnosis.customCodes = code_arr

    //add to finalList to show in print/copy view
    let target_diagnosis_arr = this.finalList.filter(diag => diag.id == diagnosis.id)
    let target_diagnosis = target_diagnosis_arr[0]
    target_diagnosis.customCodes = Object.assign([], code_arr)

    //close add dialog
    this.closeAddCode(ev);
  }

  /*****Add Goal */
  openChangeGoal(ev){
    let el = (ev.target as Element);
    let addBox = el.closest(".diagnosis-detail").getElementsByClassName("change-goal")[0]
    
    if(!addBox.classList.contains("open")){
      addBox.classList.add('open')
    }else{
      addBox.classList.remove('open')
    }    
  }

  closeChangeGoal(ev){
    let el = (ev.target as Element);
    let addBox = el.closest(".change-goal")

    if(addBox.classList.contains("open")){
      addBox.classList.remove('open')
    }
  }

  addGoalToDiagnosis(ev, diagnosis, value){
    let goal = value
    //console.log(goal)
    diagnosis.goal = goal

    //add to finalList to show in print/copy view
    let target_diagnosis_arr = this.finalList.filter(diag => diag.id == diagnosis.id)
    let target_diagnosis = target_diagnosis_arr[0]
    target_diagnosis.goal = goal

    //close add dialog
    this.closeChangeGoal(ev)
  }

  toggleShowGoal(event, diagnosis){
    let target_diagnosis_arr = this.finalList.filter(diag => diag.id == diagnosis.id)
    let target_diagnosis = target_diagnosis_arr[0]

    if(target_diagnosis.showGoal == false || !target_diagnosis.showGoal){
      target_diagnosis.showGoal = true
    }else{
      target_diagnosis.showGoal = false
    }
  }

  toggleShowCodes(event, diagnosis){
    let target_diagnosis_arr = this.finalList.filter(diag => diag.id == diagnosis.id)
    let target_diagnosis = target_diagnosis_arr[0]

    if(target_diagnosis.showCodes == false || !target_diagnosis.showCodes){
      target_diagnosis.showCodes = true
      console.log(target_diagnosis)
    }else{
      target_diagnosis.showCodes = false
      console.log(target_diagnosis)
    }
  }

  showGoalTip(ev){
  }


}
