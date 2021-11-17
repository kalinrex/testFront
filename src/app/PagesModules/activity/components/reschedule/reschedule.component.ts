import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from 'src/app/core/http/Activity/activity.service';
import { IActivity } from 'src/app/core/Models/IActivity';

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.css']
})
export class RescheduleComponent implements OnInit {
  public FormReschedule: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RescheduleComponent>,
    private actService: ActivityService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public Activity:IActivity,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.FormReschedule = this.fb.group({
      id:[this.Activity.id],
      reschedule:[this.Activity.schedule]
    })
  }
  save(){
    if(this.FormReschedule.invalid){
      this.toast.warning(
        'El fomulario enviado es incorrecto, favor de verificar los datos.',
        'Aviso'
      );
      return;
    }
    let value = this.FormReschedule.value;
    let data = {
      activity_id : value.id,
      reschedule: value.reschedule
    }
    this.actService.reschedule(data).subscribe((res: any) => {
      this.toast.success('Registro actualizado', 'Exito');
      this.dialogRef.close(true)
    });
  }
}
