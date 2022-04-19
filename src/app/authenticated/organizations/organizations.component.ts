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
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

   organizations: any[] = [];
   
   theForm: FormGroup;

   isUpdate: boolean = false;
   currentId: any = '';

   currentUserRole: any;


   constructor(
     
      private general: GeneralService,
      private auth: AuthService,
      private elementRef: ElementRef,
      private fb: FormBuilder 
 
   ) { 
      this.theForm = this.fb.group({
         name: ['', [Validators.required]],     
      });
   }

   ngOnInit(): void {
      this.getOrganizations();
      this.currentUserRole = this.auth.getCurrentRole();

      console.log(this.currentUserRole);
   }


   getOrganizations() {
      this.general.getOrganizations().subscribe(res => {
         if(res.data && res.data.length) {
            this.organizations = res.data;
         }
      });
   }


   doAddOrganization() {
      let data = {
         name: this.theForm.controls.name.value
      };

      this.general.addOrganization(data).subscribe(res => {
         this.getOrganizations();
         this.theForm.reset();
         Swal.fire({
           title: 'Success',
           text: 'Data processed successfully',
           icon: 'success',
           confirmButtonText: 'Cool'
         })

      });
   }


   cancelEdit() {
      this.isUpdate = false;
      this.theForm.reset();
      this.currentId = '';
   }

   setEdit(item: any) {
      this.isUpdate = true;
      this.currentId = item.id;
      this.theForm.controls.name.setValue(item.name);
   }


   updateOrganization() {
      let data = {
         name: this.theForm.controls.name.value
      };

      this.general.updateOrganization(data, this.currentId).subscribe(res => {
         this.getOrganizations();
         this.cancelEdit();
         Swal.fire({
           title: 'Success',
           text: 'Data processed successfully',
           icon: 'success',
           confirmButtonText: 'Cool'
         })
      });
   }


   deleteOrganization(id: number) {
      this.general.deleteOrganization(id).subscribe(res => {
         this.getOrganizations();
         Swal.fire({
           title: 'Success',
           text: 'Data processed successfully',
           icon: 'success',
           confirmButtonText: 'Cool'
         })
      });
   }






}
















