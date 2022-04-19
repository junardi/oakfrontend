import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedComponent } from './authenticated.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArchiveComponent } from './archive/archive.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { StudentDatabaseComponent } from './student-database/student-database.component';  
import { ReportsComponent } from './reports/reports.component';    
import { SettingsComponent } from './settings/settings.component'; 
import { UserComponent } from './user/user.component';   

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedComponent,
    children: [ 
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'archive',
        component: ArchiveComponent
      },
      {
        path: 'organizations',
        component: OrganizationsComponent 
      },
      {
        path: 'student-database',
        component: StudentDatabaseComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
        path: 'settings',
        component: SettingsComponent 
      },
      {
        path: 'users',
        component: UserComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule { }














