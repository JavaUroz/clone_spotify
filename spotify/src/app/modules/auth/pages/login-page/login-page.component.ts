import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf]
})
export class LoginPageComponent implements OnInit{
  errorSession: Boolean = false
  formLogin: FormGroup = new FormGroup ({})

  constructor(private asAuthService: AuthService, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    )
  }

  sendLogin():void{
    const { email, password } = this.formLogin.value
    this.asAuthService.sendCredentials(email, password)
    .subscribe(responseOk => {
      console.log('Sesion iniciada!', responseOk)
      const {tokenSession, data} = responseOk
      this.cookie.set('token', tokenSession, 1, '/')
      this.router.navigate(['/','tracks'])
    }, error => {
      this.errorSession = true
      console.log('Error de login en mail o password!')
    })
  }
}
