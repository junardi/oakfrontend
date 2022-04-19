import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent implements OnInit {

   currentUserRole: any;
   currentUserOrgId: any;

   constructor(
      private auth: AuthService, 
      private router: Router 
   ) { }

   ngOnInit(): void {

      this.currentUserRole = this.auth.getCurrentRole();
      this.currentUserOrgId = Number(this.auth.getCurrentOrgId());
   }

   logOut() {
      this.auth.clearStorageData();
      this.router.navigateByUrl('/login');
   }

}
