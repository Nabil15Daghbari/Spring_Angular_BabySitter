import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BabysitterComponent } from './babysitter/babysitter.component';
import { ParentComponent } from './parent/parent.component';
import { EnfantComponent } from './enfant/enfant.component';

const routes: Routes = [
 {
  path:'babySitter', 
  component:BabysitterComponent
 }, 
 {
  path:'parent',
  component:ParentComponent
 }, 
 {
  path:'enfant',
  component:EnfantComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
