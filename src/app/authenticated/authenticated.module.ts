import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { AuthenticatedComponent } from './authenticated.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArchiveComponent } from './archive/archive.component';



@NgModule({
  declarations: [
    AuthenticatedComponent,
    HomepageComponent,
    ArchiveComponent
  ],
  imports: [
    CommonModule,
    AuthenticatedRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthenticatedModule { }
