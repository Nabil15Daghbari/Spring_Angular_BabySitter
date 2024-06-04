import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilsRoutingModule } from './profils-routing.module';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import { ProfilParentComponent } from './profil-parent/profil-parent.component';
import { ProfilBabysitterComponent } from './profil-babysitter/profil-babysitter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbCollapseModule, NgbNavModule, NgbPopoverModule, NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ProfilAdminComponent,
    ProfilParentComponent,
    ProfilBabysitterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProfilsRoutingModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbCollapseModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    NgbPopoverModule,
  ]
})
export class ProfilsModule { }
