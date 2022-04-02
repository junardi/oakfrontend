import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../general.service'; 
import { AuthService } from '../../auth.service';

declare var require: any;

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

   files: any = [];
   

   constructor(
      private general: GeneralService,
      private auth: AuthService 
   ) { }


   ngOnInit(): void {
      this.getFiles();
   }

   onChange(event: any) {
      //console.log(event);
      let file = event.target.files[0];
      const formData = new FormData(); 

      // Store form name as "file" with file data
      formData.append("file", file);
      formData.append("user_id", this.auth.getCurrentUserId());

      this.general.uploadFile(formData).subscribe(res => {
         //console.log(res);
         this.getFiles();
      });

   }


   getFiles() {
      const data ={
         user_id: this.auth.getCurrentUserId()
      };

      this.general.getFiles(data).subscribe(res => {
         this.files = res.data;
      });
   }

   doDownload(id: number, contentType: any, originalName: any) {

      //console.log(id);
      this.general.downloadFile(id).subscribe(data => {
         
         let FileSaver = require('file-saver');

         const blob: any = new Blob([data], { type: contentType });

         FileSaver.saveAs(blob, originalName);
     
      });

   }


   deleteFile(id: number) {
      this.general.deleteFile(id).subscribe(res => {
         if(res.success) {
            this.getFiles();
         }
      });
   }


}
























