import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
   constructor(
      private auth: AuthService,
      private router: Router
   ) {

   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {                      
   
      const loginData = JSON.parse(this.auth.getLoginData());
      if(loginData) {
         this.router.navigateByUrl('/');
      }
      return true;
   


   }
  
}
