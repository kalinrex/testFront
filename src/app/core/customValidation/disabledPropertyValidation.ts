import { AbstractControl, ControlContainer } from "@angular/forms";
import { Status } from "src/app/Constantes/Status";

export class DisabledPropertiesValidation {

  static isDisabled(control: AbstractControl){
    const value = control.value;
    console.log(value)
    if(value !== null){
      if(value.status === Status[1].value){
        return {isDisabled: true}
      }
    }
    return null
  }
}
