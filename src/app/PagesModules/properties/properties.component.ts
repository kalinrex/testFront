import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Status } from 'src/app/Constantes/Status';
import { PropertiesService } from 'src/app/core/http/Properties/properties.service';
import { IProperty } from 'src/app/core/Models/IProperty';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  @ViewChild('dataGridRef', { static: false }) dataGrid: DxDataGridComponent;
  public FormProperties: FormGroup;
  public formSubmitted = false;
  public status = Status;
  public Properties: IProperty[];
  public Edit = false;
  public selectedRowsData:any[];

  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    private propService: PropertiesService
    ) { }

  ngOnInit(): void {
    this.FormProperties = this.fb.group({
      id:[null],
      title:[],
      address:[],
      description:[],
      status:[this.status[0].value]
    })

    this.getProperties();
  }
  getProperties(){
    this.propService.getProperties().subscribe((res: IProperty[])=>{
      this.Properties = res;
    });
  }
  validateForm(campo: string): boolean {
    if (this.FormProperties.get(campo).invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  save(){
    this.formSubmitted = true;
    if(this.FormProperties.invalid){
      this.toast.warning(
        'El fomulario enviado es incorrecto, favor de verificar los datos.',
        'Aviso'
      );
      return;
    }
    let values = this.FormProperties.value
    let data: IProperty = {
      id:values.id,
      title: values.title,
      address: values.address,
      description: values.description,
      status: values.status
    }
    if(values.id === null && !this.Edit){
      this.propService.saveProperty(data).subscribe((res: any) => {
        this.toast.success("Registro guardado", "Exito");
        this.getProperties();
        this.formSubmitted = false;
        this.clear();
      })
    }else{
      this.propService.updateProperty(data).subscribe((res: any) => {
        this.toast.success("Registro actualizado", "Exito");
        this.formSubmitted = false;
        this.getProperties();
        this.clear();
      })
    }
  }
  deleteProperty(){
    let id = this.selectedRowsData[0].id;
    this.propService.deleteProperty(id).subscribe((res: any)=>{
      this.toast.success("Registro eliminado", "Exito");
      this.getProperties();
      this.clear();
    })
  }
  getSelectedData() {
    this.Edit = true;
    this.selectedRowsData = this.dataGrid.instance.getSelectedRowsData();
    this.FormProperties = this.fb.group({
      id: [this.selectedRowsData[0].id],
      title: [this.selectedRowsData[0].title],
      address: [this.selectedRowsData[0].address],
      description: [this.selectedRowsData[0].description],
      status: [this.selectedRowsData[0].status],
    });
  }
  clear(){
    this.Edit =false;
    this.formReset();
  }
  formReset() {

    this.FormProperties.reset();

    Object.keys(this.FormProperties.controls).forEach(key => {
      this.FormProperties.get(key).setErrors(null) ;
    });
}
}

