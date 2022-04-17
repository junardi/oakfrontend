import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../../general.service'; 
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

   @Input() name: any;
   studentForm: FormGroup;
   @Input() courses: any[] = [];
   @Input() yearLevels: any[] = [];
   @Input() sections: any[] = [];
   @Input() organizations: any[] = [];
   @Input() student: any = null;

   isUpdate: boolean = false;


   constructor(
      public activeModal: NgbActiveModal,
      private fb: FormBuilder, 
      private general: GeneralService,
      private auth: AuthService
   ) { 

      

      this.studentForm = this.fb.group({
         lastName: ['', [Validators.required]],
         firstName: ['', [Validators.required]], 
         middleName: ['', [Validators.required]],
         idNumber: ['', [Validators.required]],
         lrn: ['', [Validators.required]],
         course: ['', [Validators.required, Validators.min(1)]],
         currentYearLevel: ['', [Validators.required]],
         section: ['', [Validators.required]],
         sex: ['', [Validators.required]],
         gender: ['', [Validators.required]],
         civilStatus: ['', [Validators.required]],
         address: ['', [Validators.required]],
         mothersMaidenName: ['', [Validators.required]],
         fathersName: ['', [Validators.required]],
         isMemberOfIps: ['', [Validators.required]],
         tribe: [''],
         withDisability: ['', [Validators.required]],
         organization: ['', [Validators.required]] 
      });

   }

   ngOnInit(): void {

      if(this.student) {
         this.studentData.lastName.setValue(this.student.last_name);
         this.studentData.firstName.setValue(this.student.first_name);
         this.studentData.middleName.setValue(this.student.middle_name);
         this.studentData.idNumber.setValue(this.student.id_number);
         this.studentData.lrn.setValue(this.student.lrn);
         this.studentData.course.setValue(this.student.course);
         this.studentData.currentYearLevel.setValue(this.student.current_year_level);    
         this.studentData.section.setValue(this.student.section);    
         this.studentData.sex.setValue(this.student.sex); 
         this.studentData.gender.setValue(this.student.gender);
         this.studentData.civilStatus.setValue(this.student.civil_status);
         this.studentData.address.setValue(this.student.address);
         this.studentData.mothersMaidenName.setValue(this.student.mothers_maiden_name);                                    
         this.studentData.fathersName.setValue(this.student.fathers_name);
         this.studentData.isMemberOfIps.setValue(this.student.is_member_of_ips);
         this.studentData.tribe.setValue(this.student.tribe);
         this.studentData.withDisability.setValue(this.student.with_disability);
         this.studentData.organization.setValue(this.student.organization);
         this.isUpdate = true;
      } else {
         this.isUpdate = false;
      }

   }

   get studentData(): any { return this.studentForm.controls }   


   addStudent() {
      
      let data = {
         last_name: this.studentForm.controls.lastName.value,
         first_name: this.studentForm.controls.firstName.value, 
         middle_name: this.studentForm.controls.middleName.value,
         id_number: this.studentForm.controls.idNumber.value,
         lrn: this.studentForm.controls.lrn.value,
         course: Number(this.studentForm.controls.course.value),
         current_year_level: Number(this.studentForm.controls.currentYearLevel.value),
         section: Number(this.studentForm.controls.section.value),
         sex: this.studentForm.controls.sex.value,
         gender: this.studentForm.controls.gender.value,
         civil_status: this.studentForm.controls.civilStatus.value,
         address: this.studentForm.controls.address.value,
         mothers_maiden_name: this.studentForm.controls.mothersMaidenName.value,
         fathers_name: this.studentForm.controls.fathersName.value,
         is_member_of_ips: this.studentForm.controls.isMemberOfIps.value,
         tribe: this.studentForm.controls.tribe.value,
         with_disability: this.studentForm.controls.withDisability.value,
         organization: Number(this.studentForm.controls.organization.value),
         user_id: this.auth.getCurrentUserId()
      };

      console.log(data);

      this.general.addStudent(data).subscribe(res => {
         if(res.success) {
            this.closeModal();
         } else {
            alert('Error adding.');
         }
      });

   }


   updateStudent() {
      let data = {
         last_name: this.studentForm.controls.lastName.value,
         first_name: this.studentForm.controls.firstName.value, 
         middle_name: this.studentForm.controls.middleName.value,
         id_number: this.studentForm.controls.idNumber.value,
         lrn: this.studentForm.controls.lrn.value,
         course: Number(this.studentForm.controls.course.value),
         current_year_level: Number(this.studentForm.controls.currentYearLevel.value),
         section: Number(this.studentForm.controls.section.value),
         sex: this.studentForm.controls.sex.value,
         gender: this.studentForm.controls.gender.value,
         civil_status: this.studentForm.controls.civilStatus.value,
         address: this.studentForm.controls.address.value,
         mothers_maiden_name: this.studentForm.controls.mothersMaidenName.value,
         fathers_name: this.studentForm.controls.fathersName.value,
         is_member_of_ips: this.studentForm.controls.isMemberOfIps.value,
         tribe: this.studentForm.controls.tribe.value,
         with_disability: this.studentForm.controls.withDisability.value,
         organization: Number(this.studentForm.controls.organization.value)
      };

      this.general.updateStudent(data, this.student.id).subscribe(res => {
         if(res.success) {
            this.closeModal();
         } else {
            alert("Failed updating student.");
         }
      });
   }


   closeModal() {
      this.activeModal.close(true);
   }


}









