import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AddStudentComponent } from '../modals/add-student/add-student.component';                                          
import { GeneralService } from '../../general.service';   
import { AuthService } from '../../auth.service';  
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import Fuse from 'fuse.js'


@Component({
  selector: 'app-student-database',
  templateUrl: './student-database.component.html',
  styleUrls: ['./student-database.component.css']
})
export class StudentDatabaseComponent implements OnInit {


   selectedOrg: any = 0;

   courses: any[] =[];
   yearLevels: any[] =[];
   sections: any[] =[];
   students: any[] = [];
   organizations: any[] = [];

   selectedStudent: any = null;

   searchResults: any[] = [];

   currentUserRole: any;
   currentUserOrgId: any;

   @ViewChild('search', { static: false }) search: ElementRef<any>;


   constructor(
      private general: GeneralService,
      private auth: AuthService,
      private modalService: NgbModal,
      private elementRef: ElementRef
   ) { 
      this.search = elementRef;
   }

   ngOnInit(): void {

      
      this.currentUserRole = this.auth.getCurrentRole();
      this.currentUserOrgId = Number(this.auth.getCurrentOrgId());

   
      this.general.getCourses().subscribe(res => {
         if(res.data && res.data.length) {
            this.courses = res.data;
         }
      });

      this.general.getYearLevels().subscribe(res => {
         if(res.data && res.data.length) {
            this.yearLevels = res.data;
         }
      });

      this.general.getSections().subscribe(res => {
         if(res.data && res.data.length) {
            this.sections = res.data;
         }
      });


      this.general.getOrganizations().subscribe(res => {
         if(res.data && res.data.length) {
            
            if(this.currentUserOrgId) {
               this.organizations = res.data.filter((item: any) => {
                  if(item.id == this.currentUserOrgId) {
                     return item;
                  }
               });
            } else {
               this.organizations = res.data;
            }

           

         }
      });

      this.getStudents();



   }

   open() {

      const modalRef = this.modalService.open(AddStudentComponent, { size: 'lg' });
      modalRef.componentInstance.name = 'Mark, are you okay';
      modalRef.componentInstance.courses = this.courses;
      modalRef.componentInstance.yearLevels = this.yearLevels;
      modalRef.componentInstance.sections = this.sections;
      modalRef.componentInstance.organizations = this.organizations;
      modalRef.componentInstance.student = this.selectedStudent;

      modalRef.result.then(result =>{
         console.log("closed with result");
         this.selectedStudent = null;
         this.getStudents();

         if(result) {
            Swal.fire({
              title: 'Success',
              text: 'Data processed successfully',
              icon: 'success',
              confirmButtonText: 'Cool'
            })
         }
      }, (reason) => {
         console.log("closed with reason");
         this.selectedStudent = null;
         this.getStudents();
      });

      // this.modalService.open(AddStudentComponent).result.then((result) => {
      //    console.log("closed with result");
      // }, (reason) => {
      //    console.log("closed with reason");
      // });

   }


   getStudents() {
      
     
      this.general.getStudents().subscribe(res => {
         
         if(res.data && res.data.length) {
            
            let students = res.data;

            if(this.selectedOrg != '') {

               students = students.filter((elem: any) =>{
                  
                  // console.log(elem);
                  // return elem;
                  if(elem.organization == Number(this.selectedOrg)) {
                     return elem;
                  }
               })
            } 


            if(this.currentUserOrgId) {
               students = students.filter((elem: any) => {
                  if(elem.organization == this.currentUserOrgId) {
                     return this.currentUserOrgId;
                  }
               });
            }


            this.students = students;

            
         }
      
      });
   }

   getCourseName(id: any) {
      let course = this.courses.find(x => x.id == id);
      if(course) {
         return course.name;
      } else {
         return "";
      }
   }

   getSectionName(id: any) {
      let section = this.sections.find(x => x.id == id);
      if(section) {
         return section.name;
      } else {
         return "";
      }
   }

   getYearLevelName(id: any) {
      let yearLevel = this.yearLevels.find(x => x.id == id);

      if(yearLevel) {
         return yearLevel.name;
      } else {
         return "";
      }

   }

   getOrganizationName(id: any) {
      let organization = this.organizations.find(x => x.id == id);

      if(organization) {
         return organization.name;
      } else {
         return "";
      }
   }


   deleteStudent(id: number) {

      console.log(id);
      this.general.deleteStudent(id).subscribe(res => {
         
         location.reload();

        
         // if(res.success) {
         //    this.getStudents();
         // } else {  
         //    alert("Error deleting.");
         // }

        
      });
   }


   editStudent(data: any) {
      this.selectedStudent = data;
      this.open();
   }


   ngAfterViewInit() {
      
      const searchKeyup = fromEvent(this.search.nativeElement, 'keyup');
      searchKeyup.pipe(debounceTime(500)).subscribe(res => {

         let searchResult: any[] = [];
        
         let searchValue = this.search.nativeElement.value.trim();

         console.log(searchValue);

         if(searchValue != '') {
            
            const options = {
              includeScore: true,
              threshold: 0.3,
              keys: ['last_name', 'first_name']
            }

            const fuse = new Fuse(this.students, options);
            const result = fuse.search(searchValue);

            result.filter((element, index) => {
               searchResult.push(element.item);
            }); 

         
            this.students = searchResult;
           

         } else {

            this.getStudents();
         }
         

      });

   }



   changeFilter() {
      //console.log(this.selectedOrg);

      // if(this.selectedOrg != '') {
      //    this.students = this.students.filter(elem => {
      //       if(elem.organization == Number(this.selectedOrg)) {
      //          return elem;
      //       }
      //    });
      // }

      this.getStudents();
      
   }



}




















