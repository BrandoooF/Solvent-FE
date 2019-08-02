import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MasterPaneComponent } from '../master-pane/master-pane.component';
import { PrintviewComponent } from '../printview/printview.component';
import { AuthGuardService } from '../auth-guard.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ProfileComponent } from '../profile/profile.component';
import { ContactComponent } from '../contact/contact.component';
import { BillingComponent } from '../billing/billing.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AssessmentsComponent } from '../assessments/assessments.component';
import { AssessmentDetailComponent } from '../assessment-detail/assessment-detail.component';

const routes = [
  {
    path:"", 
    redirectTo: "/v",
    pathMatch: "full",
  },
  {path:"login", component: LoginComponent, },
  {path:"register", component: RegisterComponent},
  {path:"dashboard", component: DashboardComponent, canActivate: [AuthGuardService]},
  {path:"v", component: MasterPaneComponent, canActivate: [AuthGuardService]},
  {path:"printview", component: PrintviewComponent, canActivate: [AuthGuardService]},
  {path:"profile", component: ProfileComponent, canActivate: [AuthGuardService]},
  {path:"assessments", component: AssessmentsComponent, canActivate: [AuthGuardService]},
  {path:"assessment/:id", component: AssessmentDetailComponent, canActivate: [AuthGuardService]},
  {path:"contact", component: ContactComponent, canActivate: [AuthGuardService]},
  {path:"billing", component: BillingComponent, canActivate: [AuthGuardService]},
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }