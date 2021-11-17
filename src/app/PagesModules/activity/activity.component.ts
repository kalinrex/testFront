import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/Constantes/Status';
import { ActivityService } from 'src/app/core/http/Activity/activity.service';
import { IActivity } from 'src/app/core/Models/IActivity';
import Swal from 'sweetalert2';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { RescheduleComponent } from './components/reschedule/reschedule.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @ViewChild('dataGridRef', { static: false }) dataGrid: DxDataGridComponent;

  public Activities: IActivity[];
  public Options = false;
  public Activity: IActivity;
  public selectedRowsData:IActivity[];
  public FormFilters: FormGroup;
  public panelOpenState = false;
  public status = Status

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    public actService: ActivityService,
    public dialog: MatDialog) {

      this.status.unshift({value: "All", viewValue:"All"})
    }

  ngOnInit(): void {
    this.FormFilters = this.fb.group({
      dateStart:[],
      dateEnd:[],
      status:[]
    })
    this.getActivities();
  }
  getActivities(){
    this.actService.getActivities().subscribe((res: IActivity[]) =>{
      this.Activities = res;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddActivityComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.getActivities();
    });
  }
  getSelectedData(){
    this.Options = true;
    this.selectedRowsData = this.dataGrid.instance.getSelectedRowsData();
    this.Activity = this.selectedRowsData[0];
  }

  reschedule(){
    const dialogRef = this.dialog.open(RescheduleComponent, {width: '300px',data:this.Activity});
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.getActivities();
      this.Options = false;
    })
  }
  endActivity(){
    let data = {
      activity_id: this.Activity.id
    }
    Swal.fire({
      title: '¿Finalizar actividad?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.actService.endActivity(data).subscribe((res: any)=> {
          this.toast.success("Actividad Cancelada", "Exito")
          this.getActivities()
          this.Options = false;
        })
      }
    })
  }
  cancelActivity(){
    let data = {
      activity_id: this.Activity.id
    }
    Swal.fire({
      title: 'Cancelar actividad?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.actService.cancelActivity(data).subscribe((res: any)=> {
          this.toast.success("Actividad Cancelada", "Exito")
          this.getActivities()
          this.Options = false;
        })
      }
    })
  }
  search(){
    if(this.FormFilters.invalid){
      this.toast.warning(
        'El fomulario enviado es incorrecto, favor de verificar los datos.',
        'Aviso'
      );
      return;
    }
    let value = this.FormFilters.value;
    this.actService.search(value.dateStart, value.dateEnd, value.status).subscribe((res: IActivity[])=>{
      this.Activities=[];
      this.Activities = res;
    })
  }
}
