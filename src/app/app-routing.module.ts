import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleComponent } from './sample/sample.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';


const routes: Routes = [
   { 
      path: '', 
      loadChildren: () => import('./authenticated/authenticated.module').then(m => m.AuthenticatedModule),                                         
      canActivate: [AuthGuard]
   },
   { 
      path: 'login', 
      loadChildren: () => import('./main/main.module').then(m => m.MainModule),
      canActivate: [LoginGuard]
   },
   { path: 'sample', component: SampleComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
