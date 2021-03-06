import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertiesComponent } from './properties/properties.component';
import { ActivityComponent } from './activity/activity.component';

const routes: Routes = [
  {
    path: 'activity',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ActivityComponent, data: {parent: 'Test', title: 'Activity' } },
      { path: 'properties', component: PropertiesComponent, data: {parent: 'Test', title: 'Properties' } },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
