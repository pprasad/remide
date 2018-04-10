import {Route,Router,RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {FdDashboardComponent} from './components/dashboard.component';

const routes:Route[]=[
    {path:'',pathMatch:'full',redirectTo:'dashboard'},
    {path:'dashboard',component:FdDashboardComponent}
]

export const AppRoutes:ModuleWithProviders=RouterModule.forRoot(routes);