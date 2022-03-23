import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../general.service'   

declare var require: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

   file: any = null; 

   constructor(private general: GeneralService) { }

   ngOnInit(): void {
   }

   addUserForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),   
      position: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),  
      gender: new FormControl('', Validators.required),
      //birthdate: new FormControl('', Validators.required)
   });  

   get username(): any { return this.addUserForm.get('username'); }     
   get password(): any { return this.addUserForm.get('password'); }   
   get firstName(): any { return this.addUserForm.get('firstName'); }   
   get lastName(): any { return this.addUserForm.get('lastName'); }   
   get position(): any { return this.addUserForm.get('position'); }   
   get role(): any { return this.addUserForm.get('role'); }   
   get gender(): any { return this.addUserForm.get('gender'); }   
  // get birthdate(): any { return this.addUserForm.get('birthdate'); }   


   doAddUser() {
      
      let dataObj = {
         username: this.username.value,
         password: this.password.value,
         firstName: this.firstName.value,
         lastName: this.lastName.value,
         position: this.position.value,
         role: this.role.value,
         gender: this.gender.value,
         //birthdate: this.birthdate.value
      };
   
      console.log(dataObj);
      this.general.addUser(dataObj).subscribe(data => {
         console.log(data);
      });

   }


   onChange(event: any) {
      this.file = event.target.files[0];
   }


   doUpload() {
    
      //console.log(this.file);

      this.general.upload(this.file).subscribe(data => {
         console.log(data);
      });


   }


   doDownload() {

     
      
      this.general.download().subscribe(data => {
         //console.log(data);

         let FileSaver = require('file-saver');

         const blob: any = new Blob([data], { type: 'application/pdf' });

         FileSaver.saveAs(blob, "roadmap.pdf");
     

      });


   }



}

















































