import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../general.service'; 
import { AuthService } from '../../auth.service';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import Fuse from 'fuse.js'
import Swal from 'sweetalert2';

declare var require: any;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  
  users: any[] = [];
  organizations: any[] = [];
  userForm: FormGroup;


   constructor(
      private general: GeneralService,
      private auth: AuthService,
      private elementRef: ElementRef,
      private fb: FormBuilder 
   ) { 

      this.userForm = this.fb.group({
         username: ['', [Validators.required]],     
         password: ['', [Validators.required]],
         fullname: ['', [Validators.required]],
         organization_id: ['', [Validators.required]]
      });

      this.getOrganizations();

   }


   ngOnInit(): void {
      this.getUsers();
     
   }


   getUsers() {
      let data = {
         role: 'user'
      };
      this.general.getUsers(data).subscribe(res => {
         if(res.data && res.data.length) {
            this.users = res.data;
            console.log(this.users);
         }   
      });
   }


   getOrganizations() {
      this.general.getOrganizations().subscribe(res => {
         if(res.data && res.data.length) {
            this.organizations = res.data;
            console.log(this.organizations);
         }
      }); 
   }


   addUser() {

      let data = {
         username: this.userForm.controls.username.value,     
         password: this.userForm.controls.password.value,    
         fullname: this.userForm.controls.fullname.value,  
         role: 'user',  
         organization_id: this.userForm.controls.organization_id.value 
      };

      console.log(data);

      this.general.addNewUser(data).subscribe(res => {
         this.getUsers();
         this.userForm.reset();
      });
   }


   getOrgName(id: any) {
      
      if(id) {
          let organization = this.organizations.find(x => x.id == id);
         return organization.name;
      }
     
   }



}
























