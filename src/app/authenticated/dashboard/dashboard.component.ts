import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';  

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   currentUsername: any;

   constructor(
   private auth: AuthService
   ) { 
      this.currentUsername = this.auth.getCurrentUsername();
   }

   ngOnInit(): void {
   }


}
