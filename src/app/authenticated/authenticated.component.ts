import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent implements OnInit {

   constructor(
      private auth: AuthService, 
      private router: Router 
   ) { }

   ngOnInit(): void {
   }

   logOut() {
      this.auth.clearStorageData();
      this.router.navigateByUrl('/login');
   }

}
