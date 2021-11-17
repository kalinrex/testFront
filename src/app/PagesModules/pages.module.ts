import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PropertiesComponent } from './properties/properties.component';
import { ComponentsModule } from '../core/Components/components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { DxDataGridModule } from 'devextreme-angular';
import { ActivityComponent } from './activity/activity.component';
import { AddActivityComponent } from './activity/components/add-activity/add-activity.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RescheduleComponent } from './activity/components/reschedule/reschedule.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PropertiesComponent,
    ActivityComponent,
    AddActivityComponent,
    RescheduleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    DxDataGridModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatExpansionModule,
  ],
  entryComponents: [
    AddActivityComponent
  ]
})
export class PagesModule { }
