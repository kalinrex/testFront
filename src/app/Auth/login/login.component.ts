import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/http/Auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public hide = true;
  public formSubmitted = false;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    // private spinner: NgxSpinnerService
  ) {
    this.checkAuth();
  }
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: [
        localStorage.getItem('EmailRemember') || '',
        [Validators.required, Validators.email],
      ],
      Password: ['', [Validators.required]],
      Remember: [true],
    });
  }

  login($event: Event): void {
    // this.spinner.show();
    $event.preventDefault();
    this.formSubmitted = true;
    if (this.loginForm.invalid && this.formSubmitted) {
      // this.spinner.hide();
      Swal.fire(
        'Error',
        'Ha ocurrido un error, favor de intentarlo de nuevo.',
        'warning'
      );
      return;
    }
    const data = this.loginForm.value;
    this.authService.login(data).subscribe(
      (res:any) => {
        if (this.loginForm.get('Remember').value) {
          localStorage.setItem(
            'EmailRemember',
            this.loginForm.get('Email').value
          );
        } else {
          localStorage.removeItem('EmailRemember');
        }
        this.router.navigateByUrl('/');
      },
      (error: any) => {
      }
    );
  }
  validateForm(campo: string): boolean {
    if (this.loginForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }
  checkAuth(): void {
    if (this.authService.isAuth()) {
      this.router.navigate(['/dashboard']);
    }
  }
  hideItem(){
    this.hide = !this.hide
  }

}
