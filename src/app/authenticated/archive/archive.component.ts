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
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

   files: any = [];

   @ViewChild('search', { static: false }) search: ElementRef<any>;


   constructor(
      private general: GeneralService,
      private auth: AuthService,
      private elementRef: ElementRef
   ) {
      this.search = elementRef;
   }


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
         Swal.fire({
           title: 'Success',
           text: 'Data processed successfully',
           icon: 'success',
           confirmButtonText: 'Cool'
         })
      });

   }


   getFiles() {
      const data ={
         user_id: this.auth.getCurrentUserId()
      };

      this.general.getFiles(data).subscribe(res => {
         this.files = res.data;

         //console.log(this.files);
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

   doSearch() {
      console.log("lets do search");
   }

   ngAfterViewInit() {
     
      //console.log("Hello World.");

      const searchKeyup = fromEvent(this.search.nativeElement, 'keyup');
      searchKeyup.pipe(debounceTime(500)).subscribe(res => {

         let searchResult: any[] = [];
        
         let searchValue = this.search.nativeElement.value.trim();

         console.log(searchValue);

         if(searchValue != '') {
            
            const options = {
              includeScore: true,
              threshold: 0.3,
              keys: ['content_type', 'original_name']
            }

            const fuse = new Fuse(this.files, options);
            const result = fuse.search(searchValue);

            result.filter((element, index) => {
               searchResult.push(element.item);
            }); 

         
            this.files = searchResult;

         } else {
            this.getFiles();
         }
         

      });
   
   }


}
























