import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint = `${environment.apiUrl}/Auth/login`;
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  login(data:{Email: string, password: string}): any{
    return this.http.post(this.endpoint, data, {headers: this.headers}).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('Expiracion', res.expiration)
      }));
  }
  isAuth (): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }
  logout(): void{
    localStorage.removeItem('token');
  }
}
