import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DisabledPropertiesValidation } from 'src/app/core/customValidation/disabledPropertyValidation';
import { ActivityService } from 'src/app/core/http/Activity/activity.service';
import { PropertiesService } from 'src/app/core/http/Properties/properties.service';
import { IActivity } from 'src/app/core/Models/IActivity';
import { IProperty } from 'src/app/core/Models/IProperty';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css'],
})
export class AddActivityComponent implements OnInit {
  public Properties: IProperty[];
  public FormActivity: FormGroup;
  public formSubmitted = false;
  constructor(
    public dialogRef: MatDialogRef<AddActivityComponent>,
    private actService: ActivityService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private propService: PropertiesService
  ) {}

  ngOnInit(): void {
    this.FormActivity = this.fb.group({
      id: [null],
      property_id: [null, DisabledPropertiesValidation.isDisabled],
      schedule: [],
      title: [],
    });
    this.getProperties();
  }

  getProperties() {
    this.propService.getProperties().subscribe((res: IProperty[]) => {
      this.Properties = res;
    });
  }

  save() {
    this.formSubmitted = true;
    if (this.FormActivity.invalid && this.formSubmitted) {
      this.toast.warning(
        'El fomulario enviado es incorrecto, favor de verificar los datos.',
        'Aviso'
      );
      return;
    }
    let value = this.FormActivity.value;
    let data: IActivity = {
      property_id: value.property_id.id,
      schedule: value.schedule,
      title: value.title,
    };
    this.actService.saveActivities(data).subscribe((res: any) => {
      this.toast.success('Registro guardado', 'Exito');
      this.FormActivity.reset();
      this.dialogRef.close(true)
    });
  }
  validateForm(campo: string): boolean {
    if (this.FormActivity.get(campo).invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }
}
