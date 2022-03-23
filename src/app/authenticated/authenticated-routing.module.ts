import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedComponent } from './authenticated.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArchiveComponent } from './archive/archive.component';


const routes: Routes = [
  {
    path: '',
    component: AuthenticatedComponent,
    children: [ 
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'archive',
        component: ArchiveComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule { }
