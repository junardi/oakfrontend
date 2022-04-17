import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../general.service';   
import { AuthService } from '../../auth.service';  

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

   organizations: any[] = [];
   

   constructor(
      private general: GeneralService,
      private auth: AuthService
  
   ) { }

   ngOnInit(): void {

      this.general.getOrganizations().subscribe(res => {
         if(res.data && res.data.length) {
            this.organizations = res.data;
         }
      });

   }

}
