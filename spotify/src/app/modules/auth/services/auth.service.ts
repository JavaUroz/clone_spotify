import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api

  constructor(private http: HttpClient, private cookie: CookieService) { }

  sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      email,
      password
    }

    return this.http.post(`${this.URL}/auth/login/`, body)
    // .pipe(
    //   tap((responseOk: any) => {
    //     const {tokenSession, data} = responseOk
    //     this.cookie.set('token_service', tokenSession, 1, '/')
    //   }),
    //   catchError(err => {
    //     const {status, statusText} = err
    //     console.log('🔴🔴🔴 error de login', [status, statusText])
    //     return of ([])
    //   })
    // )
  }
}
