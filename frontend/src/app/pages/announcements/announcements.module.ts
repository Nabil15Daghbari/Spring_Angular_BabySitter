import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementsRoutingModule } from './announcements-routing.module';
import { AnnouncementAdminComponent } from './announcement-admin/announcement-admin.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementBabysitterComponent } from './announcement-babysitter/announcement-babysitter.component';
import { AnnouncementParentComponent } from './announcement-parent/announcement-parent.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { OffreParentComponent } from './offre-parent/offre-parent.component';
import { OffreBabysitterComponent } from './offre-babysitter/offre-babysitter.component';
import { AvisComponent } from './avis/avis.component';


@NgModule({
  declarations: [
    AnnouncementAdminComponent,
    AnnouncementsComponent,
    AnnouncementBabysitterComponent,
    AnnouncementParentComponent,
    OffreParentComponent,
    OffreBabysitterComponent,
    AvisComponent,
  ],
  imports: [
    CommonModule,
    AnnouncementsRoutingModule ,
    SharedModule,
    UIModule,
    ArchwizardModule,
    NgbDropdownModule,
  ]
})
export class AnnouncementsModule { }   
