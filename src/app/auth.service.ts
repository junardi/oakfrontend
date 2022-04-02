import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';  
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   
   httpOptions = {
      headers: new HttpHeaders({
         'Content-Type':  'application/json'
      })
   }; 


   constructor(

      private http: HttpClient

   ) { }

   doLogin(data: any) {
      return this.http.post<any>(environment.baseUrl + "/do-login", data, this.httpOptions);  
   }


   setLoginData(data: any) {
      localStorage.setItem('loginData', JSON.stringify(data[0]));
   }


   getLoginData(): any {
      return localStorage.getItem('loginData');
   }

   clearStorageData() {
      localStorage.clear();
   }


   getCurrentUserId() {
      const loginData = JSON.parse(this.getLoginData());
      return loginData.id;
   }


}








