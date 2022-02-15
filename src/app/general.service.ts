import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';  
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

   httpOptions = {
      headers: new HttpHeaders({
         'Content-Type':  'application/json'
      })
   }; 
   

   constructor(
      private http: HttpClient
   ) { }


   getSample() {
      return this.http.get<any>(environment.baseUrl + "/");  
   }


  addUser(data: any) {
     return this.http.post<any>(environment.baseUrl + "/user", data, this.httpOptions);  
  }



}
