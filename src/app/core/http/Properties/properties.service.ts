import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProperty } from '../../Models/IProperty';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  private endpoint = `${environment.apiUrl}/Property`;
  constructor(private http: HttpClient) { }

  saveProperty(property: IProperty){
    return this.http.post(`${this.endpoint}/addProperty`, property).pipe(map(res => res))
  }
  getProperties(): Observable<IProperty[]>{
    return this.http.get<IProperty[]>(`${this.endpoint}/getProperties`).pipe(map(res => res))
  }
  updateProperty(data: IProperty){
    return this.http.put(`${this.endpoint}/updateProperty`, data).pipe(map(res => res));
  }
  deleteProperty(id: number){
    return this.http.delete(`${this.endpoint}/deleteProperty/${id}`).pipe(map(res => res))
  }
}
