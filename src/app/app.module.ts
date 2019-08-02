import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { UiSwitchModule } from 'ngx-ui-switch';

import { OnsenModule } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MasterPaneComponent } from './master-pane/master-pane.component';
import { DetailComponent } from './detail/detail.component';
import { DataserviceService } from './dataservice.service';
import { PrintviewComponent } from './printview/printview.component';
import { AppRoutingModule } from './app-routing/app-routing.module'
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { Browser } from 'protractor';
import { FilterPipe } from './filter.pipe';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PrintFinalComponent } from './print-final/print-final.component';
import { ContactComponent } from './contact/contact.component';
import { PreferencesService } from './preferences.service';
import { CardCheckoutComponent } from './card-checkout/card-checkout.component';
import { PaymentServiceService } from './payment-service.service';
import { BillingComponent } from './billing/billing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TooltipDirective } from './tooltip.directive';
import { AssessmentsComponent } from './assessments/assessments.component';
import { AssessmentService } from './assessment.service';
import { AssessmentDetailComponent } from './assessment-detail/assessment-detail.component';
import { AssessmentOverviewComponent } from './assessment-overview/assessment-overview.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavigationComponent,
    MasterPaneComponent,
    DetailComponent,
    PrintviewComponent,
    LoginComponent,
    UserComponent,
    FilterPipe,
    RegisterComponent,
    ProfileComponent,
    PrintFinalComponent,
    ContactComponent,
    CardCheckoutComponent,
    BillingComponent,
    DashboardComponent,
    TooltipDirective,
    AssessmentsComponent,
    AssessmentDetailComponent,
    AssessmentOverviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    UiSwitchModule.forRoot({
      size: 'small',
      color: '#3dc1d3',
      switchColor: 'white',
      defaultBgColor: 'white',
      defaultBoColor : 'whitesmoke',
      checkedLabel: 'show',
      uncheckedLabel: 'hide',
    }),
  ],
  providers: [
    DataserviceService,
    AuthGuardService,
    PreferencesService,
    AuthService,
    PaymentServiceService,
    AssessmentService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
