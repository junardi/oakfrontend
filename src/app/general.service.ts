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


   upload(file: any) {

      // console.log(file);
      // console.log(file.name);
     
      const newOption = {
         headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data'
         })
      }; 

      // Create form data
      const formData = new FormData(); 

      // Store form name as "file" with file data
      formData.append("file", file);

      //console.log(formData.get('file'));

      return this.http.post<any>(environment.baseUrl + "/test-upload", formData);   
   }


   download():Observable<Blob> {
      const requestOptions: Object = {
         responseType: 'blob'
      };   
      return this.http.get<any>(environment.baseUrl + "/test-download", requestOptions);                                          
   }


   uploadFile(formData: any) {

      // const newOption = {
      //    headers: new HttpHeaders({
      //       'Content-Type': 'multipart/form-data'
      //    })
      // };

      return this.http.post<any>(environment.baseUrl + "/file-upload", formData);

   }


   getFiles(data: any) {
      return this.http.post<any>(environment.baseUrl + "/get-files", data, this.httpOptions);                   
   }

   downloadFile(id: number):Observable<Blob> {
      
     
      const requestOptions: Object = {
        
         responseType: 'blob',

      };   

      return this.http.get<any>(environment.baseUrl + "/download-file/" + id , requestOptions);                                               
   }


   deleteFile(id: number) {
      return this.http.delete<any>(environment.baseUrl + "/delete-file/" + id , this.httpOptions);                                               
   }


   addStudent(data: any) {
      return this.http.post<any>(environment.baseUrl + "/add-student/", data, this.httpOptions)
   }


   getCourses() {
      return this.http.post<any>(environment.baseUrl + "/get-courses", this.httpOptions);
   }

   getYearLevels() {
      return this.http.post<any>(environment.baseUrl + "/get-year-levels", this.httpOptions);                              
   }

   getSections() {
      return this.http.post<any>(environment.baseUrl + "/get-sections", this.httpOptions);                              
   }

   getStudents() {
      return this.http.post<any>(environment.baseUrl + "/get-students", this.httpOptions);                                                           
   }

   deleteStudent(id: number) {
      return this.http.delete<any>(environment.baseUrl + "/delete-student/" + id , this.httpOptions);                                                
   }

   updateStudent(data: any, id: number) {
      return this.http.put<any>(environment.baseUrl + "/update-student/" + id, data, this.httpOptions);                                                     
   }


   getOrganizations() {
      return this.http.post<any>(environment.baseUrl + "/get-organizations", this.httpOptions);                              
   }


   addOrganization(data: any) {
      return this.http.post<any>(environment.baseUrl + "/add-organization/", data, this.httpOptions)
   }

   updateOrganization(data: any, id: any) {
      return this.http.put<any>(environment.baseUrl + "/update-organization/" + id, data, this.httpOptions);                                                     
   }


   deleteOrganization(id: number) {
      return this.http.delete<any>(environment.baseUrl + "/delete-organization/" + id , this.httpOptions);                                                
   }


   getUsers(data: any) {
      return this.http.post<any>(environment.baseUrl + "/get-users", data, this.httpOptions);                              
   }


   addNewUser(data: any) {
      return this.http.post<any>(environment.baseUrl + "/add-user", data, this.httpOptions);  
   }


}






























