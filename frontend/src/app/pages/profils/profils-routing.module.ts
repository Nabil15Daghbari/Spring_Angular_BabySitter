import { ParentComponent } from './../users/parent/parent.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import { ProfilBabysitterComponent } from './profil-babysitter/profil-babysitter.component';
import { ProfilParentComponent } from './profil-parent/profil-parent.component';

const routes: Routes = [
  {
    path:"profil_Admin" ,
    component:ProfilAdminComponent
  },
  {
    path:"profil_babysitter",
    component:ProfilBabysitterComponent
  },
  {
    path:"profil_parent",
    component:ProfilParentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilsRoutingModule { }
