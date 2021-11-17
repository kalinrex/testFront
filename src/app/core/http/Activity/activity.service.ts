import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActivity } from '../../Models/IActivity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private endpoint = `${environment.apiUrl}/Activity`;
  constructor(private http: HttpClient) { }

  getActivities(): Observable<IActivity[]>{
    return this.http.get<IActivity[]>(`${this.endpoint}/getActivity`).pipe(map(res => res))
  }
  saveActivities(data: IActivity){
    return this.http.post(`${this.endpoint}/addActivity`, data).pipe(map(res => res));
  }
  reschedule(data: any){
    return this.http.put(`${this.endpoint}/reschedule`, data).pipe(res => res);
  }
  cancelActivity(data: any){
    return this.http.put(`${this.endpoint}/cancelActivity`,data).pipe(res => res);
  }
  endActivity(data: any){
    return this.http.put(`${this.endpoint}/endActivity`,data).pipe(res => res);
  }
  search(dateStart:Date, dateEnd: Date, status: string): Observable<IActivity[]>{
    return this.http.get<IActivity[]>(`${this.endpoint}/search/${dateStart}/${dateEnd}/${status}`).pipe(map(res => res))
  }
}
