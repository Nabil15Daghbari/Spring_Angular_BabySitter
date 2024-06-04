import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementAdminComponent } from './announcement-admin/announcement-admin.component';
import { AnnouncementParentComponent } from './announcement-parent/announcement-parent.component';
import { AnnouncementBabysitterComponent } from './announcement-babysitter/announcement-babysitter.component';
import { OffreParentComponent } from './offre-parent/offre-parent.component';
import { OffreBabysitterComponent } from './offre-babysitter/offre-babysitter.component';

const routes: Routes = [
  {
    path:'announcement_admin' ,
    component:AnnouncementAdminComponent
  },
  {
    path:'announcement_parent',
    component:AnnouncementParentComponent
  },
  {
    path:'announcement_babysitter',
    component:AnnouncementBabysitterComponent
  },
  {
    path:'offre_parent',
    component:OffreParentComponent
  },
  {
    path:'offre_babysitter',
    component:OffreBabysitterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementsRoutingModule { }
