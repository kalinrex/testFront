import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardActionsComponent } from './card-actions/card-actions.component';



@NgModule({
  declarations: [CardActionsComponent],
  imports: [
    CommonModule
  ],
  exports:[
    CardActionsComponent
  ]
})
export class ComponentsModule { }
