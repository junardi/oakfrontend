import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   constructor(
      private auth: AuthService,
      private router: Router
   ) { }

   ngOnInit(): void {
   }


   loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
   });  


   get username(): any { return this.loginForm.get('username'); }
   get password(): any { return this.loginForm.get('password'); }


   doLogin() {
      
      const data = {
         username: this.username.value.trim(),
         password: this.password.value.trim()
      }

      this.auth.doLogin(data).subscribe(res => {
         
         if(res.success) {
            this.auth.setLoginData(res.data);

            this.router.navigateByUrl('/');

         } else {
            this.loginForm.reset();
            alert("Invalid username or password");
         }

      });

   }



}















