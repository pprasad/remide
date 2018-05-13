import {Route,Router,RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {FdDashboardComponent} from './components/dashboard.component';
import {ExternalLinkComponent} from './components/app.externallink.component';

const routes:Route[]=[
    {path:'',pathMatch:'full',component:ExternalLinkComponent},
    {path:'dashboard',component:FdDashboardComponent}
]

export const AppRoutes:ModuleWithProviders=RouterModule.forRoot(routes);