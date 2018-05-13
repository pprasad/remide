import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
/*Layout*/
import {FuiNavigationComponent} from './layout/navigation.component';
import {FdFooterComponent} from './layout/footer.component';
import {FdDashboardComponent} from './components/dashboard.component';
import {FdEditorDialogComponent} from './components/caseeditor.component';
import {ModalModule,BsDatepickerModule,BsDropdownModule} from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';
/*Error Components & Services*/
import { FdControlMessagesComponent } from './components/fdcontrolmessages.component';
import {ValidationService } from './components/validate.service';
import {CommonUtilService} from './components/commonutils.service';
import {RestTemplateService} from './components/resttemplate.service';
/*Notifications*/
import {ToastyModule} from 'ng2-toasty';
import {DataTableComponent,DataTableService} from './components/datatable.component';
import {SpinnerComponent,SpinnerService} from './components/spinner.component';
import {PieChartComponent,PieChartService} from './components/piechart.component';
/*Router Service*/
import {AppRoutes} from './app.router.service';
import {ExternalLinkComponent} from './components/app.externallink.component';
import {AuthorizationService} from './components/authorization.service';


@NgModule({
  declarations: [
    FdControlMessagesComponent,
    SpinnerComponent,
    PieChartComponent,
    DataTableComponent,
    AppComponent,
    FuiNavigationComponent,
    FdFooterComponent,
    FdDashboardComponent,
    FdEditorDialogComponent,
    ExternalLinkComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutes,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastyModule.forRoot(),
    HttpModule,
    ChartsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [ValidationService,CommonUtilService,RestTemplateService,
    SpinnerService,DataTableService,PieChartService,{provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthorizationService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
