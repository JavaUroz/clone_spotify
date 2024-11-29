import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

/**
 * Session Guard Function
 * @returns
 */
export const SessionGuardFunctional = ():boolean => {
  const cookieService = inject(CookieService) 
  const router = inject(Router)

  try{
    const token: boolean = cookieService.check('token')      
    if (!token){
      router.navigate(['/', 'auth'])
    }  
    return token
    
  } catch(e) {
    console.log('🧧Ocurrió un Error🧧', e)
    return false
  }
}