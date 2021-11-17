import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardActionsComponent } from './card-actions/card-actions.component';
import { LabelsComponent } from './labels/labels.component';



@NgModule({
  declarations: [CardActionsComponent, LabelsComponent],
  imports: [
    CommonModule
  ],
  exports:[
    CardActionsComponent,
    LabelsComponent
  ]
})
export class ComponentsModule { }
