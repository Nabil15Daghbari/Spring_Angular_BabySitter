import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ParentComponent } from './parent/parent.component';
import { BabysitterComponent } from './babysitter/babysitter.component';
import { EnfantComponent } from './enfant/enfant.component';


   
@NgModule({
  declarations: [
    ParentComponent,
    BabysitterComponent,
    EnfantComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule ,
    ReactiveFormsModule,
    NgbDropdownModule,
  ]
})
export class UsersModule { }
