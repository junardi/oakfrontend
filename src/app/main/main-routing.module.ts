import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
   {
      path: '', 
      component: MainComponent,
      children: [
         {
            path: '', component: LoginComponent 
         }
      ]
   }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
