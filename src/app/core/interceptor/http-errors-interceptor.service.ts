import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorsInterceptorService implements HttpInterceptor{

  private token = localStorage.getItem('token') || '';

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle( req ).pipe(
        catchError((error) => this.errorHandler(error) )
    );
  }
  // tslint:disable-next-line: typedef
  errorHandler(error: HttpErrorResponse){
    if (error.status === 401){
      Swal.fire('Aviso', 'Su sesion a expirado', 'warning');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return throwError(error);
    }
    if(error.status === 0 ){
      Swal.fire('Aviso', 'No se pudo conectar al servidor', 'warning');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return throwError(error);
    }
    let messageError = error.error.errors.Errors ? error.error.errors.Errors : error.error.errors
    Swal.fire('Notificación', messageError, 'warning');
    return throwError(error);
  }
}
