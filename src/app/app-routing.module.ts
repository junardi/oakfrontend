import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleComponent } from './sample/sample.component';


const routes: Routes = [
   { 
      path: '', 
      loadChildren: () => import('./authenticated/authenticated.module').then(m => m.AuthenticatedModule) 
   },
   { 
      path: 'login', 
      loadChildren: () => import('./main/main.module').then(m => m.MainModule)
   },
   { path: 'sample', component: SampleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
