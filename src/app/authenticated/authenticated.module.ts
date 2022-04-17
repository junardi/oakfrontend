import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { AngularDigitalClockModule } from 'angular-digital-clock';
import { AuthenticatedComponent } from './authenticated.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArchiveComponent } from './archive/archive.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { StudentDatabaseComponent } from './student-database/student-database.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { AddStudentComponent } from './modals/add-student/add-student.component';         



@NgModule({
  declarations: [
    AuthenticatedComponent,
    HomepageComponent,
    ArchiveComponent,
    DashboardComponent,
    OrganizationsComponent,
    StudentDatabaseComponent,
    ReportsComponent,
    SettingsComponent,
    AddStudentComponent
  ],
  imports: [
    CommonModule,
    AuthenticatedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularDigitalClockModule
  ]
})
export class AuthenticatedModule { }
