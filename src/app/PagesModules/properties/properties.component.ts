import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public FormProperties: FormGroup;
  public formSubmitted = false;
  public status = Status;
  public Properties: IProperty[];

  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    private propService: PropertiesService
    ) { }

  ngOnInit(): void {
    this.FormProperties = this.fb.group({
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
      title: values.title,
      address: values.address,
      description: values.description,
      status: values.status
    }
    this.propService.saveProperty(data).subscribe((res: any) => {
      this.toast.show("Registro guardado", "Exito");
      this.getProperties();
      this.FormProperties.reset();
    })
  }
}

